const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { Faculty } = require("./faculty");
const { Class } = require("./class");

const Assignment = sequelize.define("Assignment", {
  tile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  faculty_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Faculty,
      key: "id",
    },
  },
  class_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: "id",
    },
  },
});
