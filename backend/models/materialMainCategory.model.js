
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        //categoryName: {type: DataTypes.STRING, allowNull: false},
        degree: {type: DataTypes.STRING, allowNull: false},
        threeDProgramm: {type: DataTypes.STRING, allowNull: false},
        thickness: {type: DataTypes.STRING, allowNull: false},
        weight: {type: DataTypes.STRING, allowNull: false},
        product_group: {type: DataTypes.STRING, allowNull: false},
        //FK zu materialComposition, surfaceLooks, materialSubCategory, Material
    }

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('materialMainCategory', attributes);
}
