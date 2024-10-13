const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { Faculty } = require("./faculty");
const { Student } = require("./student");

const Grade = sequelize.define("Grade", {
  grade: {},
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facult_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Faculty,
      key: "id",
    },
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
});

module.exports = { Grade };
