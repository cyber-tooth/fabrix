const express = require('express');
const materialController = require('../controllers/material.controller');
const authorize = require('../security/authorize.js');
const Role = require('../helpers/role.js');
const router = express.Router();

// Material Routes
router.get('/', materialController.getAll);
router.get('/filter', materialController.filterMaterials);
router.get('/:id', materialController.getById);
router.get('/:id/category_tree', materialController.getCategoryTreeById);
router.post('/',  materialController.create); //authorize(Role.admin, Role.superAdmin),
router.put('/:id', materialController.update); //authorize(Role.superAdmin, Role.admin),
router.delete('/:id', materialController.delete); //authorize(Role.superAdmin),

module.exports = router;
