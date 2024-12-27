const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const StudentModel = require("./stundentModel");
const { SemesterModel } = require("./semesterModel");

export const TransactionStudentsModel = sequelize.define(
  "transaction_students",
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: StudentModel,
        key: "id",
      },
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SemesterModel,
        key: "id",
      },
    },
  }
);
