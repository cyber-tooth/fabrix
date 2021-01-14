const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        material_id: {type: DataTypes.INTEGER, allowNull: false, unique: 'compositeIndex', autoIncrement: true, primaryKey: true,
            references: {
                // This is a reference to another model
                model: material.model,

                // This is the column name of the referenced model
                key: 'id'
            }},
        material_composition_id: {type: DataTypes.INTEGER, allowNull: false, unique: 'compositeIndex', autoIncrement: true, primaryKey: true,
            references: {
                // This is a reference to another model
                model: material_composition.model,

                // This is the column name of the referenced model
                key: 'id'
            }},
        degree: {type: DataTypes.INTEGER, allowNull: false}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('consists_of', attributes, options);
}
