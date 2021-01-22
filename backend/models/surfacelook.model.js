const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        weave: {type: DataTypes.STRING, allowNull: true},
        knit: {type: DataTypes.STRING, allowNull: true},
        nonWoven: {type: DataTypes.STRING, allowNull: true},
        //FK von Material
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('surfacelook', attributes, options);
}
