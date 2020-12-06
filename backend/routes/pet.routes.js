var express = require('express');
var petController = require('../controllers/pet.controllers');
var authorize = require('../security/authorize.js');
const Role = require('../helpers/role.js');
var router = express.Router();

// Pet Routes
//TODO Check the access level admin, user
router.get('/',authorize(Role.superAdmin), petController.getAll);
router.get('/:id', petController.getById);
router.post('/', petController.create);
router.put('/:id', petController.update);
router.delete('/:id', petController.delete);

module.exports = router;
