var express = require('express');
var authorize = require('../security/authorize.js');
var path = require('path');
var accountController = require('../authentication/users.controller');

var userRoutes = require('../routes/user.routes');
var swaggerRoutes = require('../routes/swagger.routes');
var stoffRoutes = require('../routes/stoff.routes');
var materialRoutes = require('../routes/material.routes');
var imageController = require('../controllers/image.controller');
const upload = require("../services/image_upload.service");
var uploadController = require('../services/more_images_upload.service');

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
    authRoutes.put('/update-user/:id', accountController.update, accountController.updateSchema);

    // User routes
    apiRoutes.use('/v1/users', userRoutes);

    // Material routes
    apiRoutes.use('/v1/stoffe', stoffRoutes);
    apiRoutes.use('/v1/material', materialRoutes);

    //Image routes
    apiRoutes.post('/v1/upload', upload.any(), imageController.create);
    apiRoutes.post('/v1/upload_images',uploadController.uploadImages, uploadController.resizeImages, uploadController.getResult);

    //swagger ui
    apiRoutes.use('/', swaggerRoutes);

    //static
    apiRoutes.use('/public/', express.static(path.join(__dirname, '../public')));


    // Set up routes
    app.use('/api', apiRoutes);
};
