const dbConfig = require("../config/db.config.js");
const fs = require('fs');

const ca = fs.readFileSync('./app/config/ca.pem')

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    dialectOptions: {
        connectTimeout: 60000, // Set initial connection timeout to 60 seconds
        ssl: {
            require: true,
            rejectUnauthorized: true,
            ca: ca
        }
    },
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.chartEntry = require("./chartEntry.model.js")(sequelize, Sequelize);
db.chartFormula = require("./chartFormula.model.js")(sequelize, Sequelize);

module.exports = db;