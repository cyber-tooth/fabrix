const materialService = require("../services/material.service");

exports.getAll = function (req, res, next) {
    materialService.getAll()
        .then(material => res.json(material))
        .catch(next => {
            console.log("error", next)
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

exports.create = function (req, res, next) {
    materialService.create(req.body)
        .then(material => res.json(material))
        /*.then(material => {
        console.log('returning response', material);
            res.json(material);
        })*/
        .catch(next => {
            //console.log('caught error', next);
            return res.status(400).json({
                error: next
            })
        });
};

exports.getCategoryTreeById = function (req, res, next) {
    materialService.getCategoryTreeById(req.params.id)
        .then(categories => categories ? res.json(categories) : res.sendStatus(404))
        .catch(next => {
            //console.log("error", next)
            return res.status(400).json({
                error: next
            })
        });
};


// whatever filters are sent, they are OR => returns materials that satisfy any of the filters
// send the filters like {“8”: [60, 80], “7": null} you can send the degrees in an array and null for no degree
exports.filterMaterials = function (req, res, next) { //function input: filters = { catId: degree, catId: degree }
    const filters = JSON.parse(req.query.filters),
        limit = parseInt(req.query.limit), //convert from string to int
        offset = parseInt(req.query.offset);
    //console.log('type of filters', typeof filters);
    materialService.filterMaterials(filters, limit, offset)
        //sequilize.query({type: sequelize.QueryTypes.SELECT})
        .then(materials => materials ? res.json(materials) : res.sendStatus(404))
        .catch(next => {
            console.log('next', next);
            return res.status(400).json({
                error: next
             })
        });
};