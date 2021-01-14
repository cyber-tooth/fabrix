const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        material_id: {type: DataTypes.INTEGER, allowNull: false,
            references: {
                model: Material, // This is a reference to another model
                key: 'id' // This is the column name of the referenced model
            }},
        material_composition_id: {type: DataTypes.INTEGER, allowNull: false,
            references: {
                model: Composition, // This is a reference to another model
                key: 'id' // This is the column name of the referenced model
            }},
        degree: {type: DataTypes.INTEGER, allowNull: false}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('consists_of', attributes, options);
}
