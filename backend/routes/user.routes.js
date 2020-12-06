var express = require('express');
var accountController = require('../authentication/users.controller');
var authorize = require('../security/authorize.js');
const Role = require('../helpers/role.js');
var router = express.Router();

// User Routes
router.get('/', authorize(Role.superAdmin), accountController.getAll);
router.get('/:id', authorize(), accountController.getById);
router.post('/', authorize(), accountController.createSchema, accountController.create);
router.put('/:id', authorize(Role.superAdmin), accountController.updateSchema, accountController.update);
router.delete('/:id', authorize(Role.superAdmin), accountController._delete);

module.exports = router;
