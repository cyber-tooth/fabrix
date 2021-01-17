const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        category_name: {type: DataTypes.STRING(250), allowNull: false},
        has_degree: {type: DataTypes.BOOLEAN},
        degree_title: {type: DataTypes.STRING}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('category', attributes, options);
}
