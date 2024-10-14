const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const DepartmentModel = require("./departmentModel");

const ClassModel = sequelize.define("class", {
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DepartmentModel,
      key: "id",
    },
  },
});
module.exports = ClassModel;
