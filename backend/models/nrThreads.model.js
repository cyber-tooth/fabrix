const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        threads: {type: DataTypes.STRING, allowNull: true},
        weftThreads: {type: DataTypes.STRING, allowNull: true},
        warpThreads: {type: DataTypes.STRING, allowNull: true},
        //FK von Material
    }

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('NrOfThreads', attributes);
}
