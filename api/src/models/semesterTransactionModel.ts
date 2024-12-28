import sequelize from "@/db";
import { DataTypes } from "sequelize";
import SemesterModel from "./semesterModel";

const TransactionSemesterModel = sequelize.define("transaction_semester", {
  semester_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SemesterModel,
      key: "id",
    },
  },
  admission_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export default TransactionSemesterModel;
