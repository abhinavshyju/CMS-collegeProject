const { DataTypes } = require("sequelize");
const sequelize = require("../db");

export const SemesterModel = sequelize.define("semester", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
