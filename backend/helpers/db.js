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
    db.Pet = require('../models/pet.model')(sequelize);
    db.Stoffe = require('../models/stoff.model')(sequelize);
    db.RefreshToken = require('../authentication/refresh-token.model')(sequelize);
    db.Category = require('../models/category.model')(sequelize);
    db.Consists = require('../models/consists_of.model')(sequelize);
    db.Material = require('../models/material.model')(sequelize);
    db.Composition = require('../models/material_composition.model')(sequelize);
    db.Pictures = require('../models/pictures.model')(sequelize);

    // define relationships
    db.User.hasMany(db.RefreshToken, {
        onDelete: 'CASCADE'
    });
    db.RefreshToken.belongsTo(db.User);
    db.Category.belongsToMany(db.Category,{foreignKey:'parent_category'},
        {onDelete: 'CASCADE', onUpdate: 'CASCADE'}); //self-referencing category belongs to only one parent category
    db.Consists.belongsToMany(db.Composition,
        {through: 'material.model', foreignKey: 'id', otherKey: 'id'},
        {onDelete: 'CASCADE', onUpdate: 'CASCADE'}); // composition table
    db.Composition.belongsTo(db.Category, {foreignKey:'category_id'},
        {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    db.Pictures.belongsTo(db.Material, {foreignKey:'material_id'},
        {onDelete: 'CASCADE', onUpdate: 'CASCADE'});

    // sync all models with database
    await sequelize.sync();
}
