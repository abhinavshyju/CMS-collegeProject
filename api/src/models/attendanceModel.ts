import { DataTypes } from "sequelize";
import sequelize from "../db";
import ClassModel from "./classModel";
import FacultyModel from "./facultyModel";

import HourModel from "./hourModel";
import DateModel from "./dateModel";
import { TransactionStudentsModel } from "./transactionModel";

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
