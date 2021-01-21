const db = require('../helpers/db.js');
const { Op } = require('sequelize');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getCategoryTreeById
};

async function getAll() {
    const material = await db.Material.findAll();
    return material.map(x => basicDetails(x));
}

async function getById(id) {
    const material = await getMaterial(id);
    return basicDetails(material);
}

async function update(id, params) {
    const material = await getMaterial(id);

    // copy params to material and save
    Object.assign(material, params);
    await material.save();

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