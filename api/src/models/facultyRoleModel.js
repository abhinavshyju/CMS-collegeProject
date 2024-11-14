const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const FacultyRoleModel = sequelize.define("faculty-role", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = FacultyRoleModel;
