const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        degree: {type: DataTypes.STRING, allowNull: true}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('consistsOf', attributes, options);
}
