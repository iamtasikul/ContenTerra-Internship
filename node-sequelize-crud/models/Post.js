const Sequelize = require("sequelize");
const db = require("../config/db");

const Post = db.define("post", {
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  published: { type: Sequelize.BOOLEAN },
});

module.exports = Post;
