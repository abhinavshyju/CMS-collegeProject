const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const ClassModel = require("./classModel");
const FacultyModel = require("./facultyModel");

const HourModel = require("./hourModel");
const DateModel = require("./dateModel");
const { TransactionStudentsModel } = require("./transactionModel");

const AttendanceModel = sequelize.define("attendance", {
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  hour_id: {
    type: DataTypes.INTEGER,
    references: {
      model: HourModel,
      key: "id",
    },
  },
  data_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DateModel,
      key: "id",
    },
  },
  class: {
    type: DataTypes.INTEGER,
    references: {
      model: ClassModel,
      key: "id",
    },
  },
  faculty_id: {
    type: DataTypes.INTEGER,
    references: {
      model: FacultyModel,
      key: "id",
    },
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: TransactionStudentsModel,
      key: "id",
    },
  },
});

module.exports = AttendanceModel;
