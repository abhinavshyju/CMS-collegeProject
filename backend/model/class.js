const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { Department } = require("./department");

const Class = sequelize.define("Class", {
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: "id",
    },
  },
});
module.exports = { Class };
