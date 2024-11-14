const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const GenderModel = sequelize.define("gender", {
  gender: DataTypes.STRING,
});
module.exports = GenderModel;
