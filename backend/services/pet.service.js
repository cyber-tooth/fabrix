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
    const pets = await db.Pet.findAll();
    return pets.map(x => basicDetails(x));
}

async function getById(id) {
    const pet = await getPet(id);
    return basicDetails(pet);
}

async function create(paypload) {
    const pet = new db.Pet(paypload);

    await pet.save();
    return basicDetails(pet);
}

async function update(id, params) {
    const pet = await getPet(id);

    // copy params to pet and save
    Object.assign(pet,params);

    await pet.save();

    return basicDetails(pet);
}

async function _delete(id) {
    const pet = await getPet(id);
    await pet.destroy();
}

async function getPet(id) {
    const pet = await db.Pet.findByPk(id);
    if (!pet) throw 'Pet not found';
    return pet;
}

function basicDetails(pet) {
    const { id, name } = pet;
    return { id, name };
}
