var express = require('express');
var authorize = require('../security/authorize.js');
var Role = require('../helpers/role.js');
var path = require('path');
var accountController = require('../authentication/accounts.controller');

var userRoutes = require('../routes/user.routes');
var petRoutes = require('../routes/pet.routes');

module.exports = function (app) {

    var apiRoutes = express.Router(),
        authRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/v1/auth', authRoutes);

    authRoutes.post('/login', accountController.authenticateSchema, accountController.login);
    authRoutes.post('/refresh-token', accountController.refreshToken);
    authRoutes.post('/revoke-token', authorize(), accountController.revokeTokenSchema, accountController.revokeToken);
    authRoutes.post('/register', accountController.registerSchema, accountController.register);
    authRoutes.post('/verify-email', accountController.verifyEmailSchema, accountController.verifyEmail);
    authRoutes.post('/forgot-password', accountController.forgotPasswordSchema, accountController.forgotPassword);
    authRoutes.post('/validate-reset-token', accountController.validateResetTokenSchema, accountController.validateResetToken);
    authRoutes.post('/reset-password', accountController.resetPasswordSchema, accountController.resetPassword);


    // User routes
    apiRoutes.use('/v1/users', userRoutes);

    // Pet routes
    apiRoutes.use('/v1/pets', petRoutes);

    //static
    apiRoutes.use('/public/', express.static(path.join(__dirname, '../public')));
    // Set up routes
    app.use('/api', apiRoutes);
};
