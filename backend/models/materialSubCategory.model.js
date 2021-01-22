const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        opacity: {type: DataTypes.STRING, allowNull: true},
        drapeCoefficient: {type: DataTypes.STRING, allowNull: true},
        commercialFabricName: {type: DataTypes.STRING, allowNull: true},
        //FK zu Elasticity, Elongations, Material
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('materialSubCategory', attributes, options);
}
