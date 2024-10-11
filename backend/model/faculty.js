const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { Department } = require("./department");

const Faculty_role = sequelize.define("Faculty_role", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Faculty = sequelize.define("Faculty", {
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
      model: Faculty_role,
      key: "id",
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: "id",
    },
  },
});

module.exports = { Faculty };
