const categoriesService = require("../services/categories.service");

exports.getMainCategories = function (req, res) {
    categoriesService.getMainCategories()
        .then(categories => res.json(categories))
        .catch(next => {
            return res.status(400).json({
                error: next
            })
        });
};

