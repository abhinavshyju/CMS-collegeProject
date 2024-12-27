const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const RoleModel = require("./RoleModel");

const SessionModel = sequelize.define("session", {
  user_id: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.INTEGER,
    references: {
      model: RoleModel,
      key: "id",
    },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = SessionModel;
