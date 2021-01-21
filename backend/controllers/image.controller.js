const imageService = require("../services/image.service");

// nur die Funktionen getAll, getByID --> create ist in images_upload.service
exports.getAll = function (req, res, next) {
    imageService.getAll()
        .then(images => res.json(images))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

exports.getById = function (req, res, next) {
    imageService.getById(req.params.id)
        .then(image => image ? res.json(image) : res.sendStatus(404))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};
