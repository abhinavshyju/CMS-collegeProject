const sequelize = require("../db");

const RoleModel = sequelize.define("staff-role", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = RoleModel;
