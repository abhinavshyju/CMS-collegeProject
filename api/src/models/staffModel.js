const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const RoleModel = require("./RoleModel");

const StaffModel = sequelize.define("staff", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: RoleModel,
      key: "id",
    },
  },
});

module.exports = StaffModel;
