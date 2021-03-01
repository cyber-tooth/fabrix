const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const authorize = require('../security/authorize.js');
const Role = require('../helpers/role.js');
const router = express.Router();

// Material Routes
// todo check usage and remove these two APIs
router.get('/main', categoriesController.getMainCategories);
router.get('/main_and_sub', categoriesController.getMainAndSubCategories);

router.get('/', categoriesController.getChildCategories);
router.get('/:id', categoriesController.getChildCategories);

module.exports = router;
