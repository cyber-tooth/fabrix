const db = require('../helpers/db.js');
const { Op } = require('sequelize');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const material = await db.Material.findAll();
    return material.map(x => basicDetails(x));
}

async function getById(id) {
    const material = await getMaterial(id);
    return basicDetails(material);
}

async function create(paypload) {
    const material = new db.Material(paypload);

    await material.save();
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

function basicDetails(material) {
    return {
        material: {
            id: material.id,
            name: material.name,
            material_composition: material_composition.name,
            category_id: category.id,
            category_name: category.category_name,
            parent_category_id: category.parent_category_id,
            picture: picture.url,
            createdAt: material.createdAt,
            updatedAt: material.updatedAt
        }
    };
}
