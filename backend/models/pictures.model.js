const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        url: {type: DataTypes.STRING(2083), allowNull: false},
        name: {type: DataTypes.STRING(300), allowNull: true}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('pictures', attributes, options);
}
