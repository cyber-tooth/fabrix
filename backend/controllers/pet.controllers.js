const petService = require('../services/pet.service');

exports.getAll = function (req, res, next) {
    petService.getAll()
        .then(pets => res.json(pets))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.getById = function (req, res, next) {
    petService.getById(req.params.id)
        .then(pet => pet ? res.json(pet) : res.sendStatus(404))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.create = function (req, res, next) {
    petService.create(req.body)
        .then(pet => res.json(pet))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.update = function (req, res, next) {
    petService.update(req.params.id, req.body)
        .then(pet => res.json(pet))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.delete = function (req, res, next) {
    petService.delete(req.params.id)
        .then(() => res.json({
            message: 'Pet deleted successfully'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};
