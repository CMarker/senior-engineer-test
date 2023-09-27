const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const env = require("../env");

//initialize db
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: env.memoryDB ? ":memory:" : "../database.sqlite", // memory or file based on env setting
    logging: false
});

sequelize.authenticate().then(() => {
    console.log(`Database connected`);
}).catch((err) => {
    console.log(err)
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// initialize data models and export db object
db.users = require("./user") (sequelize, DataTypes);
db.sessions = require("./session") (sequelize, DataTypes);
db.tasks = require("./task") (sequelize, DataTypes);
module.exports = db;