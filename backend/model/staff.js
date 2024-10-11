const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Staff_role = sequelize.define("Staff_role", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Staff = sequelize.define("Staff", {
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
      model: Staff_role,
      key: "id",
    },
  },
});

Staff.belongsTo(Staff_role, { foreignKey: "role_id" });
Staff_role.hasMany(Staff, { foreignKey: "role_id" });

module.exports = {
  Staff,
  Staff_role,
};
