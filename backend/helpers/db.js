const config = require('../config.json');
const mysql = require('mysql2/promise');
const {
    Sequelize
} = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const {
        host,
        port,
        user,
        password,
        database
    } = config.database;
    const connection = await mysql.createConnection({
        host,
        port,
        user,
        password
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
        dialect: 'mysql',
        host: config.database.host
    });

    // init models and add them to the exported db object
    db.User = require('../authentication/users.model')(sequelize);
    db.RefreshToken = require('../authentication/refresh-token.model')(sequelize);
    db.Category = require('../models/category.model')(sequelize);
    db.ConsistsOf = require('../models/consistsOf.model')(sequelize);
    db.Material = require('../models/material.model')(sequelize);
    //db.Composition = require('../models/materialComposition.model')(sequelize);
    db.Image = require('../models/image.model')(sequelize);

    // Section to define relationships
    db.User.hasMany(db.RefreshToken, {
        onDelete: 'CASCADE'
    });
    db.RefreshToken.belongsTo(db.User);

    // self-referencing category belongs to only one parent category, 1 to N
    db.Category.belongsTo(db.Category,{
        foreignKey:'parent_category',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    db.Category.hasMany(db.Category, {
        foreignKey:'parent_category',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    // consists_of composite pair of 2 PK-FK, N to M relationship with material and composition
    db.Material.belongsToMany(db.Category, {
        foreignKey: 'material_id',
        through: 'consistsOf',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    db.Category.belongsToMany(db.Material, {
        foreignKey: 'category_id',
        through: 'consistsOf',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    db.ConsistsOf.belongsTo(db.Category, {
        foreignKey: 'category_id'
    });

    // material composition N to 1 relationship with category
    /** db.Composition.belongsTo(db.Category, {foreignKey:'category_id'},
        {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    db.Category.hasMany(db.Composition,
        {onDelete: 'CASCADE', onUpdate: 'CASCADE'}); **/

    // pictures N to 1 relationship with material
    db.Image.belongsTo(db.Material, {
        foreignKey:'material_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    db.Material.hasMany(db.Image, {
        foreignKey:'material_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    // sync all models with database
    await sequelize.sync();
}
