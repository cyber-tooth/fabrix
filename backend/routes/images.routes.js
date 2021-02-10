const express = require('express');
const imagesController = require('../controllers/image.controller');
const uploadImagesService = require('../services/images_upload.service');

const router = express.Router();

// Images Routes
router.post('/', uploadImagesService.uploadImages, uploadImagesService.resizeAndInsertImages, uploadImagesService.getResult);

module.exports = router;
