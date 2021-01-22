const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        total_elongation_mean: {type: DataTypes.STRING, allowNull: false},
        remaining_stretch_after_removal: {type: DataTypes.STRING, allowNull: false},
        remaining_stretch_after_recovery: {type: DataTypes.STRING, allowNull: false},
        //FK von material
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('elasticity', attributes, options);
}
