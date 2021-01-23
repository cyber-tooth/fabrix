const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true},
        category_name: {type: DataTypes.STRING(250), allowNull: false},
        has_degree: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}, //TRUE if filter expects a value
        degree_type: {type: DataTypes.STRING, allowNull: true}, //saves the value type if we want validation on frontend later
        degree_title: {type: DataTypes.STRING, allowNull: true} //for showing the unit on FE, eg to show "Weight [ ] kg" or
                                            //"Cotton [ ] %" then the kg and % are coming from degree_title
    };

    const options = {
        // sets timestamp for createdAt and updatedAt
        timestamps: true
    };

    return sequelize.define('category', attributes, options);
}
