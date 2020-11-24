const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        material_composition: {type: DataTypes.STRING, allowNull: false},
        product_group: {type: DataTypes.STRING, allowNull: false},
        weight: {type: DataTypes.INTEGER, allowNull: false},
        surface_look: {type: DataTypes.STRING},
        thickness: {type: DataTypes.INTEGER},
        commercial_fabric_name: {type: DataTypes.STRING},
    };

    const options = {
        timestamps: true,
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('stoffe', attributes, options);
}
