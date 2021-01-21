const materialService = require('../services/material.service');

exports.getAll = function (req, res, next) {
    materialService.getAll({
        order: sequelize.literal("createdAt DESC") //sends ALL materials in descending order of creation
    })
        .then(material => res.json(material))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.getById = function (req, res, next) {
    materialService.getById(req.params.id)
        .then(material => material ? res.json(material) : res.sendStatus(404))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.create = function (req, res, next) {
    materialService.create(req.body)
        .then(material => res.json(material))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.update = function (req, res, next) {
    materialService.update(req.params.id, req.body)
        .then(material => res.json(material))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.delete = function (req, res, next) {
    materialService.delete(req.params.id)
        .then(() => res.json({
            message: 'Material deleted successfully'
        }))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.getCategoryTreeById = function (req, res, next) {
    materialService.getCategoryTreeById(req.params.id)
        .then(categories => categories ? res.json(categories) : res.sendStatus(404))
        .catch(next => {
        return res.status(400).json({
            error: next
        })
    });
};