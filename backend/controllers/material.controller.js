const materialService = require('../services/material.service');

exports.getAll = function (req, res, next) {
    stoffeService.getAll()
        .then(stoffe => res.json(stoffe))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.getById = function (req, res, next) {
    stoffeService.getById(req.params.id)
        .then(stoff => stoff ? res.json(stoff) : res.sendStatus(404))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.create = function (req, res, next) {
    stoffeService.create(req.body)
        .then(stoff => res.json(stoff))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.update = function (req, res, next) {
    stoffeService.update(req.params.id, req.body)
        .then(stoff => res.json(stoff))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.delete = function (req, res, next) {
    stoffeService.delete(req.params.id)
        .then(() => res.json({
            message: 'Stoff deleted successfully'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};
