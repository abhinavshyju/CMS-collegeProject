const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { Class } = require("./class");
const { Faculty } = require("./faculty");
const { Student } = require("./student");

const Hour = sequelize.define("Hour", {
  hour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Date = sequelize.define("Date", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const Attendance = sequelize.define("Attendance", {
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
      model: Hour,
      key: "id",
    },
  },
  data_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Date,
      key: "id",
    },
  },
  class: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: "id",
    },
  },
  faculty_id: {
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

module.exports = { Attendance };
