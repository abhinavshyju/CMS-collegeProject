const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const GuardianInfoModel = sequelize.define("guardian-info", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mother_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  annual_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = GuardianInfoModel;
