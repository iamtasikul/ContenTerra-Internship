const Sequelize = require("sequelize");
//DB Connection
module.exports = new Sequelize("postdb", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});
