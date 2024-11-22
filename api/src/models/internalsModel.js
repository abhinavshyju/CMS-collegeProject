const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const StudentModel = require("./stundentModel");
const FacultyModel = require("./facultyModel");

const InternalsModel = sequelize.define("internals", {
  crp: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  assignment: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  seminar: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  t1: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  t2: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: StudentModel,
      key: "id",
    },
  },
  faculty_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FacultyModel,
      key: "id",
    },
  },
});

module.exports = InternalsModel;
