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
    const stoffe = await db.Stoffe.findAll();
    return stoffe.map(x => basicDetails(x));
}

async function getById(id) {
    const stoffe = await getStoffe(id);
    return basicDetails(stoffe);
}

async function create(paypload) {
    const stoffe = new db.Stoffe(paypload);

    await stoffe.save();
    return basicDetails(stoffe);
}

async function update(id, params) {
    const stoffe = await getStoffe(id);

    // copy params to stoff and save
    Object.assign(stoffe,params);

    await stoffe.save();

    return basicDetails(stoffe);
}


async function _delete(id) {
    const stoffe = await getStoffe(id);
    await stoffe.destroy();
}

async function getStoffe(id) {
    const stoffe = await db.Stoffe.findByPk(id);
    if (!stoffe) throw 'Stoff not found';
    return stoffe;
}

function basicDetails(stoffe) {
    return {
        stoffe: {
            id: stoffe.id,
            name: stoffe.name,
            material_composition: stoffe.material_composition,
            product_group: stoffe.product_group,
            weight: stoffe.weight,
            surface_look: stoffe.surface_look,
            thickness: stoffe.thickness,
            commercial_fabric_name: stoffe.commercial_fabric_name,
            createdAt: stoffe.createdAt,
            updatedAt: stoffe.updatedAt
        }
    };
}
