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
    const data = {
        id: material.id,
        name: material.name,
        created_by: material.created_by,
        categories: [],
        pictures: []
    }

    material.consistsOf.forEach(consistsOf => {
        data.category.push({
            category: consistsOf.
        })
    }
    );
}





async function create(paypload) {
    const material = await db.Material.create({name: payload.name});

    payload.consistsOf.forEach(consistsOf => { /* { category_id: 8, degree: "80" } */
        consistsOf.material_id = material.id;
    await db.ConsistsOf.create(consistsOf);
});

    payload.pictures.forEach(picture => {
        picture.material_id = material.id;
    await db.Picture.create(picture);
});

    return basicDetails(material);
}

function basicDetails(material) { /* db.Material */
    const data = {
        id: material.id,
        name: material.name,
        categories: [],
        pictures: [],
    };

    material.consistsOf.forEach( consistsOf => { /* db.ConsistsOf */
        data.categories.push({
            category: consistsOf.category.name,
            degree: consistsOf.degree
        });
});

    material.pictures.forEach( picture => {
        data.pictures.push({
            url: picture.url,
            title: picture.title
        });
});


    return data;
}