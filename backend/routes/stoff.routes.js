var express = require('express');
var stoffController = require('../controllers/stoff.controller');
var authorize = require('../security/authorize.js');
const Role = require('../helpers/role.js');
var router = express.Router();

// Stoff Routes
//TODO Check the access level admin, user
router.get('/',authorize(Role.admin), stoffController.getAll);
router.get('/:id', stoffController.getById);
router.post('/', authorize(Role.user, Role.admin), stoffController.create);
router.put('/:id',authorize(Role.admin, Role.user), stoffController.update);
router.delete('/:id',authorize(Role.admin), stoffController.delete);

module.exports = router;
