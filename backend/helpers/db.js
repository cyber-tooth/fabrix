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
    db.Material = require('../models/material.model')(sequelize);
    db.Composition = require('../models/materialComposition.model')(sequelize);
    db.Image = require('../models/image.model')(sequelize);
    db.AdditionalInfo = require('../models/additionalInfo.model')(sequelize);
    db.Elasticity = require('../models/elasticity.model')(sequelize);
    db.Elongation = require('../models/elongation.model')(sequelize);
    db.MaterialMainCategory = require('../models/materialMainCategory.model')(sequelize);
    db.MaterialSubCategory = require('../models/materialSubCategory.model')(sequelize);
    db.NrStitches = require('../models/NrStitches.model')(sequelize);
    db.NrThreads = require('../models/NrThreads.model')(sequelize);
    db.Surfacelook = require('../models/surfacelook.model')(sequelize);

    // Section to define relationships
    db.User.hasMany(db.RefreshToken, {
        onDelete: 'CASCADE'
    });
    db.RefreshToken.belongsTo(db.User);

    //Category belongsTo MainCategories, SubCategories, AdditionalInfos
    db.Category.belongsTo(db.MaterialMainCategory, {
        onDelete: 'CASCADE',
        foreignKey: 'MainCategory',
        through: 'materialMainCategory'
    });
    db.Category.belongsTo(db.MaterialSubCategory, {
        onDelete: 'CASCADE',
        foreignKey: 'SubCategory',
        through: 'materialSubCategory'
    });
    db.Category.belongsTo(db.AdditionalInfo, {
        onDelete: 'CASCADE',
        foreignKey: 'AdditionalInfo',
        through: 'AdditionalInfo'
    });
    db.Category.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })

    //MainCategory belongs to Composition, surfaceLook, Material
    db.MaterialMainCategory.belongsTo(db.Composition, {
        onDelete: 'CASCADE',
        foreignKey: 'MaterialCompositionID',
        through: 'materialComposition',
    })

    db.MaterialMainCategory.belongsTo(db.Surfacelook, {
        onDelete: 'CASCADE',
        foreignKey: 'SurfacelookID',
        through: 'surfacelook',
    })

    db.MaterialMainCategory.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })
    db.Material.hasMany(db.MaterialMainCategory, {
        onDelete: 'CASCADE'
    });

    //SubCategory belongs to Elasticity, Elongation, Material
    db.MaterialSubCategory.belongsTo(db.Elasticity, {
        onDelete: 'CASCADE',
        foreignKey: 'ElasticityID',
        through: 'elasticity',
    })
    db.MaterialSubCategory.belongsTo(db.Elongation, {
        onDelete: 'CASCADE',
        foreignKey: 'ElongationID',
        through: 'elongation',
    })
    db.MaterialSubCategory.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })
    db.Material.hasMany(db.MaterialSubCategory, {
        onDelete: 'CASCADE'
    });

    //AdditionalInfos belongs to numberOfThreadsPerUnitLength, numberOfStitchesPerUnitLength, material
    db.AdditionalInfo.belongsTo(db.NrThreads, {
        onDelete: 'CASCADE',
        foreignKey: 'NrThreadsID',
        through: 'NrThreads',
    })
    db.AdditionalInfo.belongsTo(db.NrStitches, {
        onDelete: 'CASCADE',
        foreignKey: 'NrStitchesID',
        through: 'NrStitches',
    })
    db.AdditionalInfo.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })
    db.Material.hasMany(db.AdditionalInfo, {
        onDelete: 'CASCADE'
    });

    //nrThreads, NrStitches, surfacelook, elasticity, elongation, materialComposition belongsTo material
    db.NrThreads.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })
    db.NrStitches.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })
    db.Surfacelook.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })
    db.Elasticity.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })
    db.Elongation.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })
    db.Composition.belongsTo(db.Material, {
        onDelete: 'CASCADE',
        through: 'material',
    })

    // pictures N to 1 relationship with material
    db.Image.belongsTo(db.Material, {
        foreignKey:'material_id',
        onDelete: 'CASCADE',
    });
    db.Material.hasMany(db.Image, {
        onDelete: 'CASCADE',
    });

    // sync all models with database
    await sequelize.sync();
}
