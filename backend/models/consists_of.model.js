const { DataTypes } = require('sequelize');
const { Material } = require('./material.model');
const { Composition } = require('./material_composition.model');

module.exports = model;

function model(sequelize) {
    const attributes = {
        degree: {type: DataTypes.INTEGER, allowNull: false}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('consists_of', attributes, options);
}
