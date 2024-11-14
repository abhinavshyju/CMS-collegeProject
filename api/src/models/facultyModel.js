const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const DepartmentModel = require("./departmentModel");
const RoleModel = require("./RoleModel");
const FacultyRoleModel = require("./facultyRoleModel");

const FacultyModel = sequelize.define("faculty", {
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
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DepartmentModel,
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: FacultyRoleModel,
      key: "id",
    },
  },
});

module.exports = FacultyModel;
