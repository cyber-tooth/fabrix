const db = require('../helpers/db.js');
const { Op, Sequelize } = require('sequelize');



module.exports = {
    getMainCategories,
    getChildCategories,
    getMainAndSubCategories
};


// todo remove
async function getMainCategories() {
    const category = await db.Category.findAll( { where: { parent_category : null } });
    return category.map(x => basicDetails(x));
}

async function getMainAndSubCategories() {
    const category = await db.Category.findAll( { where: { category_name : ['Main Categories', 'Sub-categories']}});

    return category.map(x => basicDetails(x));
}

async function getChildCategories(id = null) {
    const category =  await db.Category.findAll({
        where: {
            parent_category: id
        },
        include: [
            {
                model:  db.Category,
                as: 'children',
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('children.id')), 'count']
                ]
            },
            {
            model: db.ConsistsOf,
            attributes: [
                [Sequelize.fn('MIN', Sequelize.literal('CONVERT(degree, float)')), 'minDegree'],
                [Sequelize.fn('MAX', Sequelize.literal('CONVERT(degree, float)')), 'maxDegree']
            ]
        }],
        group: ['category.id']
    });
    return category.map(x => basicDetails(x, true));
}

function basicDetails(category, extra=false) {
    const details =
     {
        id: category.id,
        categoryName: category.category_name,
        hasDegree: category.has_degree,
        degreeType: category.degree_type,
        degreeTitle: category.degreeTitle,
        parent: category.parent_category,
        //children: category.children ? category.children.map(x => basicDetails(x)) : []
    };
    if (extra === true){
        if (
          category.has_degree
          && (category.degree_type === 'float' || category.degree_type === 'int')
          && category.consistsOfs
          && category.consistsOfs.length
        ){
            details.minDegree = category.consistsOfs[0].dataValues.minDegree;
            details.maxDegree = category.consistsOfs[0].dataValues.maxDegree;
        }
        if (category.children && category.children.length){ //shows if the category has children so FE needs to check if >0 then display on click
            details.childrenCount = category.children[0].dataValues.count;
        }
    }
    return details;
}
