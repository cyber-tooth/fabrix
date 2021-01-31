const db = require('../helpers/db.js');
const { Op } = require('sequelize');

module.exports = {
    getMainCategories,
    getChildCategories
};

async function getMainCategories() {
    const category = await db.Category.findAll( { where: { parent_category : null } });
    return category.map(x => basicDetails(x));
}

async function getChildCategories(id) {
    return await db.Category.findAll({
        where: {
            parent_category: id
        },
        include: {
            model: db.Category,
            as: 'children',
            required: false
        }
    });
}

function basicDetails(category) {
    return {
        id: category.id,
        categoryName: category.category_name,
        hasDegree: category.has_degree,
        degreeType: category.degree_type,
        degreeTitle: category.degreeTitle
    };
}
