const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Department = sequelize.define("Department", {
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = { Department };
