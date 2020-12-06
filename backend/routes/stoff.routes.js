var express = require('express');
var stoffController = require('../controllers/stoff.controller');
var authorize = require('../security/authorize.js');
const Role = require('../helpers/role.js');
var router = express.Router();

// Stoff Routes
router.get('/', stoffController.getAll);
router.get('/:id', stoffController.getById);
router.post('/', authorize(Role.admin, Role.superAdmin), stoffController.create);
router.put('/:id',authorize(Role.superAdmin, Role.admin), stoffController.update);
router.delete('/:id',authorize(Role.superAdmin), stoffController.delete);

module.exports = router;
