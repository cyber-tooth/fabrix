const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        fh_n_chain: {type: DataTypes.STRING, allowNull: false},
        fh_n_shots: {type: DataTypes.STRING, allowNull: false},
        //FK von material
    }

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('elongation', attributes);
}
