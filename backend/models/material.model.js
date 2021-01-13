const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        created_by: {type: DataTypes.STRING(250), allowNull: false},
        category_name: {type: DataTypes.STRING(250), allowNull: false}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('material', attributes, options);
}
