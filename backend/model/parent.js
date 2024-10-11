const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { Student } = require("./student");

const Parent = sequelize.define("Parent", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: { 
      model: Student,
      key: "id",
    },
  },
});

module.exports = { Parent };
