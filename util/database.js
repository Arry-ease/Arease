const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "nodeserver", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
