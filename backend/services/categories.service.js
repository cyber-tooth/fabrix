const db = require('../helpers/db.js');
const { Op } = require('sequelize');

module.exports = {
    getMainCategories,
};

async function getMainCategories() {
    const category = await db.Category.findAll( { where: { parent_category : null } });
    console.log(category);
    return category.map(x => basicDetails(x));
}

async function getChildCategories() {
   // TODO
}

function basicDetails(category) {
    const data = {
        id: category.id,
        categoryName: category.category_name,
        hasDegree: category.has_degree,
        degreeType: category.degree_type,
        degreeTitle: category.title
    };
    return data;
}
