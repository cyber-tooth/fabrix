var express = require('express');
var accountController = require('../authentication/users.controller');
var authorize = require('../security/authorize.js');
const Role = require('../helpers/role.js');
var router = express.Router();

// User Routes
router.get('/', authorize(Role.admin), accountController.getAll);
router.get('/:id', authorize(), accountController.getById);
router.post('/', authorize(Role.admin), accountController.createSchema, accountController.create);
router.put('/:id', authorize(), accountController.updateSchema, accountController.update);
router.delete('/:id', authorize(), accountController._delete);

module.exports = router;
