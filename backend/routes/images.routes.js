const express = require('express');
const imagesController = require('../controllers/image.controller');
const uploadImagesService = require('../services/images_upload.service');

const router = express.Router();

// Images Routes
router.get('/', imagesController.getAll);
router.get('/:id', imagesController.getById);
router.post('/', uploadImagesService.uploadImages, uploadImagesService.resizeAndInsertImages, uploadImagesService.getResult);

module.exports = router;
