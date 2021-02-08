const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const {Op} = require('sequelize');
const sendEmail = require('../helpers/send-email.js');
const db = require('../helpers/db.js');
const Role = require('../helpers/role.js');

module.exports = {
    login,
    refreshToken,
    revokeToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function login({email, password, ipAddress}) {
    const user = await db.User.scope('withHash').findOne({where: {email}});

    if (!user || !user.isVerified || !(await bcrypt.compare(password, user.passwordHash))) {
        throw 'Email or password is incorrect';
    }

    // authentication successful so generate jwt and refresh tokens
    const token = generateJwtToken(user);
    const refreshToken = generateRefreshToken(user, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
        ...basicDetails(user),
        token,
        refreshToken: refreshToken.token
    };
}

async function refreshToken({token, ipAddress}) {
    const refreshToken = await getRefreshToken(token);
    const user = await refreshToken.getAccount();

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(user);

    // return basic details and tokens
    return {
        ...basicDetails(user),
        token: jwtToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken({token, ipAddress}) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function register(params, origin) {
    // validate
    if (await db.User.findOne({where: {email: params.email}})) {
        // send already registered error in email to prevent user enumeration
        return await sendAlreadyRegisteredEmail(params.email, origin);
    }

    // create user object
    const user = new db.User(params);

    // first registered user is an admin
    const isFirstAccount = (await db.User.count()) === 0;
    user.role = isFirstAccount ? Role.superAdmin : Role.user;
    user.verificationToken = randomTokenString();

    // hash password
    user.passwordHash = await hash(params.password);

    // save user
    await user.save();

    // send email
    await sendVerificationEmail(user, origin);
}

async function verifyEmail({token}) {
    const user = await db.User.findOne({where: {verificationToken: token}});

    if (!user) throw 'Verification failed';

    user.verified = Date.now();
    user.verificationToken = null;
    await user.save();
}

async function forgotPassword({email}, origin) {
    const user = await db.User.findOne({where: {email}});

    // always return ok response to prevent email enumeration
    if (!user) return;

    // create reset token that expires after 24 hours
    user.resetToken = randomTokenString();
    user.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    // send email
    await sendPasswordResetEmail(user, origin);
}

async function validateResetToken({token}) {
    const user = await db.User.findOne({
        where: {
            resetToken: token,
            resetTokenExpires: {[Op.gt]: Date.now()}
        }
    });

    if (!user) throw 'Invalid token';

    return user;
}

async function resetPassword({token, password}) {
    const user = await validateResetToken({token});

    // update password and remove reset token
    user.passwordHash = await hash(password);
    user.passwordReset = Date.now();
    user.resetToken = null;
    await user.save();
}

async function getAll() {
    const users = await db.User.findAll();
    return users.map(x => basicDetails(x));
}

async function getById(id) {
    const user = await getAccount(id);
    return basicDetails(user);
}

async function create(params) {
    // validate
    if (await db.User.findOne({where: {email: params.email}})) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const user = new db.User(params);
    user.verified = Date.now();

    // hash password
    user.passwordHash = await hash(params.password);

    // save user
    await user.save();

    return basicDetails(user);
}

async function update(id, params) {
    const user = await getAccount(id);

    // validate (if email was changed)
    if (params.email && user.email !== params.email && await db.User.findOne({where: {email: params.email}})) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await hash(params.password);
    }

    // copy params to user and save
    Object.assign(user, params);
    user.updated = Date.now();
    await user.save();

    return basicDetails(user);
}

async function _delete(id) {
    const user = await getAccount(id);
    await user.destroy();
}

// helper functions

async function getAccount(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne({where: {token}});
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

async function hash(password) {
    return await bcrypt.hash(password, 10);
}

function generateJwtToken(user) {
    // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({sub: user.id, id: user.id}, config.secret, {expiresIn: '120m'});
}

function generateRefreshToken(user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        userId: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(user) {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        firmenname: user.firmenname,
        email: user.email,
        role: user.role,
        created: user.created,
        updated: user.updated,
        isVerified: user.isVerified,

    };
}

async function sendVerificationEmail(user, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/verify-email/${user.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        const verifyUrl = `http://localhost:4200/verify-email/${user.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'Verify your Email for Filfabs',
        html: `<h4>Verify Email for Filfabs</h4>
               <p>Thanks for your registering!</p>
               ${message}
                <p><br>
                   Kind regards, <br>
                   your Filfabs-Team </p>`
    });
}

async function sendAlreadyRegisteredEmail(email, origin) {
    let message;
    if (origin) {
        message = `<p>If you don't know your password please visit the <a href="${origin}/forgot-password">forgot password</a> page. 
                    If it wasn't you then please change your password.</p>`;
    } else {
        message = `<p>If you don't know your password please visit the <a href="http://localhost:4200/forgot-password">forgot password</a> page.
                    If it wasn't you then please change your password.</p>`;
    }

    await sendEmail({
        to: email,
        subject: 'Your Email is already registered or someone tried to register with your Email',
        html: `<h4>Email Already registered or someone tried to register</h4>
               <p>Someone tried to register with your Email but your email <strong>${email}</strong> is already registered.</p>
               ${message}`
    });
}

async function sendPasswordResetEmail(user, origin) {
    console.log('--> user.resetToken', user.resetToken)
    let message;
    if (origin) {
        const resetUrl = `${origin}/reset-password/${user.resetToken}`;
        message = `<p>Hi ${user.firstName},</p>
                    <p>You recently requested to reset your password for your Filfabs account. Click the button below to reset it. </p>
                   <p style="text-align: center">
                   <form action="${resetUrl}">
                        <input style="height: 20px" type="submit" value="Reset Password" />
                   </form>
                   <p>If you did not requested a password reset, please ignore this email. This email is only valid for the next 24 hours.</p>
                   <p>Thanks,</p>
                   <p>Your Filfabs Team</p>`;
    } else {
        const resetUrl = `http://localhost:4200/reset-password/${user.resetToken}`;
        message = `<p>Hi ${user.firstName},</p>
                    <p>You recently requested to reset your password for your Filfabs account. Click the button below to reset it. </p>
                   <p style="text-align: center">
                   <form action="${resetUrl}">
                        <input style="height: 20px" type="submit" value="Reset Password" />
                   </form>
                   <p>If you did not requested a password reset, please ignore this email. This email is only valid for the next 24 hours.</p>
                   <p>Thanks,</p>
                   <p>Your Filfabs Team</p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}
