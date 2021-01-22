const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        materialCompositionName: {type: DataTypes.STRING, allowNull: true},
        naturalMaterial: {type: DataTypes.STRING, allowNull: false},
        syntheticFibre: {type: DataTypes.STRING, allowNull: false},
        other: {type: DataTypes.BOOLEAN, STRING: false},
        //FK von material
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('materialComposition', attributes, options);
}
