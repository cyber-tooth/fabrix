const Joi = require('joi');
const validateRequest = require('../security/validate-request.js');
const accountService = require('./users.service');
const Role = require("../helpers/role");

exports.authenticateSchema = function (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
};

exports.login = function (req, res, next) {
    const {
        email,
        password
    } = req.body;
    const ipAddress = req.ip;
    accountService.login({
        email,
        password,
        ipAddress
    })
        .then(({
                   refreshToken,
                   ...user
               }) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.refreshToken = function (req, res, next) {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    accountService.refreshToken({
        token,
        ipAddress
    })
        .then(({
                   refreshToken,
                   ...user
               }) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.revokeTokenSchema = function (req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
};

exports.revokeToken = function (req, res, next) {
    // accept token from request body or cookie
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;

    if (!token) return res.status(400).json({
        message: 'Token is required'
    });

    // users can revoke their own tokens and admins can revoke any tokens
    if (!req.user.ownsToken(token) && req.user.role !== Role.superAdmin) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    accountService.revokeToken({
        token,
        ipAddress
    })
        .then(() => res.json({
            message: 'Token revoked'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.registerSchema = function (req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        firmenname: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        acceptTerms: Joi.boolean().valid(true).required()
    });
    validateRequest(req, next, schema);
};

exports.register = function (req, res, next) {
    accountService.register(req.body, req.get('origin'))
        .then(() => res.json({
            message: 'Registration successful, please check your email for verification instructions'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.verifyEmailSchema = function (req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
};

exports.verifyEmail = function (req, res, next) {
    accountService.verifyEmail(req.body)
        .then(() => res.json({
            message: 'Verification successful, you can now login'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.forgotPasswordSchema = function (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    validateRequest(req, next, schema);
};

exports.forgotPassword = function (req, res, next) {
    accountService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({
            message: 'Please check your email for password reset instructions'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.validateResetTokenSchema = function (req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
};

exports.validateResetToken = function (req, res, next) {
    accountService.validateResetToken(req.body)
        .then(() => res.json({
            message: 'Token is valid'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.resetPasswordSchema = function (req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
};

exports.resetPassword = function (req, res, next) {
    accountService.resetPassword(req.body)
        .then(() => res.json({
            message: 'Password reset successful, you can now login'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.getAll = function (req, res, next) {
    accountService.getAll()
        .then(users => res.json(users))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.getById = function (req, res, next) {
    // users can get their own user and admins can get any user
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.superAdmin) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    accountService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.createSchema = function (req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        firmenname: Joi.string().empty(''),
        email: Joi.string(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string().valid(Role.superAdmin, Role.user).required()
    });
    validateRequest(req, next, schema);
};

exports.create = function (req, res, next) {
    accountService.create(req.body)
        .then(user => res.json(user))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.updateSchema = function (req, res, next) {
    const schemaRules = {
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        firmenname: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    };

    // only admins can update role
    if (req.user.role === Role.superAdmin) {
        schemaRules.role = Joi.string().valid(Role.superAdmin, Role.user).empty('');
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
};

exports.update = function (req, res, next) {
    // users can update their own user and admins can update any user
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.superAdmin) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    accountService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports._delete = function (req, res, next) {
    // users can delete their own user and admins can delete any user
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.superAdmin) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    accountService.delete(req.params.id)
        .then(() => res.json({
            message: 'User deleted successfully'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

// helper functions

function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}
