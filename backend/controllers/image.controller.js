const imageService = require("../services/image.service");

exports.create = function (req, res, next) {
    imageService.create(req.body)
        .then(image => res.json(image))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};
