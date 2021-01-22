const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        meshes: {type: DataTypes.STRING, allowNull: true},
        wales: {type: DataTypes.STRING, allowNull: true},
        Rows_of_stitches: {type: DataTypes.STRING, allowNull: true},
        //FK von Material
    }

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('NrStitches', attributes);
}
