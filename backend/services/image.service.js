const db = require('../helpers/db.js');

module.exports = { create };

async function create(newImage) {
    const image = new db.Image(newImage);

    await image.save();
    return basicDetails(image);
}

function basicDetails(image) { /* db.Material */
    return {
        id: image.id,
        name: image.name,
        createdAt: image.createdAt,
    };
}
