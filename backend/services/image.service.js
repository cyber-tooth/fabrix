const db = require('../helpers/db.js');

module.exports = { create, getById, getAll };

async function create(newImage) {
    const image = new db.Image(newImage);

    await image.save();
    //return image;
}

async function getAll() {
    const images = await db.Image.findAll();

    return images.map(x => basicDetails(x));
}

async function getById(id) {
    const image = await getImage(id);
    return basicDetails(image);
}

async function getImage(id) {
    const image = await db.Image.findByPk(id);
    if (!image) throw 'Image is not found';
    return image;
}

function basicDetails(image) { /* db.Material */
    return {
        id: image.id,
        name: image.name,
        url: image.url,
        createdAt: image.createdAt,
        material_id: image.material_id
    };
}
