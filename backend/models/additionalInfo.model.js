const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        abrasion_resistance: {type: DataTypes.STRING, allowNull: true},
        burst_pressure: {type: DataTypes.STRING, allowNull: true},
        care_instructions: {type: DataTypes.STRING, allowNull: true},
        density: {type: DataTypes.STRING, allowNull: true},
        electrical_change: {type: DataTypes.STRING, allowNull: true},
        finishing: {type: DataTypes.STRING, allowNull: true},
        pilling: {type: DataTypes.STRING, allowNull: true},
        shrinkage: {type: DataTypes.STRING, allowNull: true},
        sustainability: {type: DataTypes.STRING, allowNull: true},
        tensile_strength: {type: DataTypes.STRING, allowNull: true},
        offerer: {type: DataTypes.STRING, allowNull: true},
        // FK zu material, FK zu numberOfThreadsPerUnitLength, FK zu numberOfStitchesPerUnitLength
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('additionalInfo', attributes, options);
}
