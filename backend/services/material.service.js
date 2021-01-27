const db = require('../helpers/db.js');
const { Op, Sequelize } = require('sequelize');

module.exports = {
    getAll,
    getById,
    update,
    delete: _delete,
    getMaterial,
    create,
    getCategoryTreeById,
    filterMaterials
};

async function getAll() { //should be used for the list of materials page we will get the infos based on basicDetails, which is id, names, end categories and images
    const material = await db.Material.findAll();
    return material.map(x => basicDetails(x));
}

async function getById(id) {
    const material = await getMaterial(id);
    return basicDetails(material);
}

async function update(id, payload) { // update material infos
    const material = await getMaterial(id);
    material.name = payload.name;

    for (const constistOf of material.consistsOf) { //delete all existing categories for the material
        consistsOf.destroy()
    }

    for (const image of material.images) { //delete all existing images for the material
        image.destroy()
    }

    for (const consistsOf of payload.consistsOf) { //creating the new categories for the material
        consistsOf.material_id = material.id;
        await db.ConsistsOf.create(consistsOf);
    }

    for (const image of payload.images) { //creating the new images for the material
        image.material_id = material.id;
        await db.Picture.create(image);
    }

    return basicDetails(material);
}


async function _delete(id) {
    const material = await getMaterial(id);
    await material.destroy();
}

async function getMaterial(id) {
    const material = await db.Material.findByPk(id);
    if (!material) throw 'Material is not found';
    return material;
}



async function create(payload) { //Material creation
    const material = await db.Material.create({name: payload.name}); //creates the Material in DB and returns the object incl ID

    for (const consistsOf of payload.consistsOf) { // loop over the array and populate each consistsOf,eg { category_id: 8, degree: "80" }
        consistsOf.material_id = material.id;
        await db.ConsistsOf.create(consistsOf);
    }

    for (const image of payload.images) { // send info for param: url and name
        image.material_id = material.id;
        await db.Picture.create(image);
    }

    return basicDetails(material);
}

function basicDetails(material) { /* db.Material */
    const data = {
        id: material.id,
        name: material.name,
        categories: [], //send only the last category chosen
        images: [],
    };

    material.consistsOf.forEach( consistsOf => { /* res object db.ConsistsOf */
        data.categories.push({
            category_id: consistsOf.category_id,
            category: consistsOf.category.name,
            degree: consistsOf.degree,
            parent_id: consistsOf.category.parent_category,
        });
    });

    material.image.forEach( image => { /* db.Image */
        data.images.push({
            url: image.url,
            name: image.name
        });
    });
    return data;
}

async function getCategoryTreeById(id) { //returns the whole category tree for material id
    const material = await getMaterial(id);
    const categoryTree = {};
    const categories = {};

    if (!material) {
        return ;
    }

    for (const consistsOf of material.consistsOf) {
        addCategoryToTree(material.consistsOf.category, material.consistsOf.degree);
    }

    function addCategoryToTree(category, degree = null) {
        const data = {
            id: category.id,
            name: category.category_name,
        };
        if (category.children !== undefined) {
            data.children = category.children;
        }
        if (degree !== null) {
            data.degree = degree;
        }
        // Add category.id => data to the array categories
        categories[category.id] = data;
        const parent = category.parent_category;
        if (!parent) { // If category.parent_category is null, add category to categoryTree, return
            categoryTree[category.id] = data;
        } else { // If category.parent_category is not null
            if (categories[parent.id] !== undefined) { // If category.parent_category exists in categories, then add category data to its children, return
                categories[parent.id].children[category.id] = data;
            } else { // Else add category to parent_category's children and call addCategoryToTree for parent_category
                parent.children = {};
                parent.children[category.id] = data;
                addCategoryToTree(parent);
            }
        }
    }
    return categoryTree;
}

// Return all materials
// function input: filters = { catId: degree, catId: degree } eg { 3: null, weight: 2 }
function filterMaterials(filters, limit = 10, offset = 0) {
    const wheres = [];

    for( const [catId, degree] in filters.entries() ) {
        const category = db.Category.find(catId),
            endCatIds = getAllEndCategories(category);
        let where;

        // For sanitization, check prepared queries in sequelize 'where table1.column2 = :val1', setParam('val1', 35)
        if (endCatIds.length === 1) { // If we have only one end category, we will use = in where condition
            where = { category_id: endCatIds[0] };
            // add degree check only if degree is not null
            if (degree !== null) {
                where.degree = degree;
            }
        } else { // for more categories, we use where in
            where = { category_id: endCatIds };
        }
        wheres.push(where);
    }

    // [1,2,3,4] or [{material_id: 1},{material_id: 2},{material_id: 3}]
    const materialIds = db.ConsistsOf.findAll({
        where: {
            [Op.or]: wheres
        },
        attributes: [
            // specify an array where the first element is the SQL function and the second is the alias
            [Sequelize.fn('DISTINCT', Sequelize.col('material_id')) ,'material_id'],
        ],
        'limit': limit, // limit is shorthand for 'limit': limit, like offset
        offset,
    }).then(function (list) {
        res.status(200).json(list);
    });

    console.log('materialIds', materialIds);

    // If materialIds are like [{material_id: 1},{material_id: 2},{material_id: 3}] then >
    // change const materialIds to let materialIds
    materialIds = materialIds.map(material => material.material_id);
    // <If materialIds are like [{material_id: 1},{material_id: 2},{material_id: 3}] then
/*
    function getAllEndCategories(category) {
        let endCatIds = [];

        const children = db.Category.find where parent_category = category.id
        if not children
        return [category.id]
    else {
            for child of children {
                const childEndCatIds = getAllEndCategories(child);
                endCatIds = [...endCatIds, ...childEndCatIds];
            }
        }

        return endCatIds;
    }
*/

    // Get materials by ids
    const materials = db.Material.findAll({
        where: {
            id: materialIds
        }
    });

    return materials.map(materiaal => basicDetails);
}

    /** Example for Cotton, weight, elasticity - 3 filter selected
    m.*
from
    material m
    inner join consistsOf c1 on m.id = c1.material_id
    inner join consistsOf c2 on m.id = c1.material_id
    inner join consistsOf c3 on m.id = c1.material_id
where
    c1.category_id = [cotton] and c1.degree = [cotton_degree]
    c2.category_id = [weight] and c2.degree = [weight_degree]
    c3.category_id = [elasticity] and c3.degree = [elasticity_degree]
;
    // execute the query and return m   aterials
    return db.querySomething(query);
}
**/