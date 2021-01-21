const express = require('express');
const materialController = require('../controllers/material.controller');
const authorize = require('../security/authorize.js');
const Role = require('../helpers/role.js');
const router = express.Router();

// Material Routes
router.get('/', materialController.getAll);
router.get('/:id', materialController.getById);
router.get('/:id/category_tree', materialController.getCategoryTreeById);
router.post('/', authorize(Role.admin, Role.superAdmin), materialController.create);
router.put('/:id',authorize(Role.superAdmin, Role.admin), materialController.update);
router.delete('/:id',authorize(Role.superAdmin), materialController.delete);

module.exports = router;
