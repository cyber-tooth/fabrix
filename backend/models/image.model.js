const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        type: { type: DataTypes.STRING},
        name: { type: DataTypes.STRING},
        data: {type: DataTypes.BLOB('long')}
    }

    return sequelize.define('image', attributes);
}
