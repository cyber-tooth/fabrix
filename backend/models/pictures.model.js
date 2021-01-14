const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        material_id: {type: DataTypes.INTEGER, allowNull: false,
            references: {
                // This is a reference to another model
                model: material.model,

                // This is the column name of the referenced model
                key: 'id'
            }},
        url: {type: DataTypes.STRING(2083), allowNull: false},
        name: {type: DataTypes.STRING(300), allowNull: false}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('pictures', attributes, options);
}
