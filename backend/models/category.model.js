const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        parent_category: {type: DataTypes.INTEGER, allowNull: false,
            references: {
                // This is a reference to another model
                model: category.model,

                // This is the column name of the referenced model
                key: 'id'
            }},
        category_name: {type: DataTypes.STRING(250), allowNull: false}
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('category', attributes, options);
}
