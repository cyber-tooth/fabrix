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



async function create(paypload) {
    const material = await db.Material.create({name: paypload.name});

    for (const consistsOf of paypload.consistsOf) { /* { category_id: 8, degree: "80" } */
        consistsOf.material_id = material.id;
    await db.ConsistsOf.create(consistsOf);
    }

    for (const picture of paypload.pictures) {
        picture.material_id = material.id;
    await db.Picture.create(picture);
    }

    return basicDetails(material);
}

function basicDetails(material) { /* db.Material */
    const data = {
        id: material.id,
        name: material.name,
        categories: [],
        images: [],
    };

    material.Category.forEach( Category => { /* db.Categorie */
        data.categories.push({
            Category: Category.id,
            MainCategory: Category.MainCategory,
            SubCategory: Category.SubCategory,
            AdditionalInfo: Category.AdditionalInfo,
        });
    });

    material.images.forEach( image => {
        data.images.push({
            url: image.url,
            title: image.title
        });
    });
    return data;
}
