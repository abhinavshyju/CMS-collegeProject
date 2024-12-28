import sequelize from "@/db";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import StudentModel from "./stundentModel";
import FacultyModel from "./facultyModel";
import AttendanceDateModel from "./attendanceDateModel";
import { TransactionStudentsModel } from "./transactionModel";

interface attendance {
  id?: number;
  student_id: number;
  faculty_id: number;
  hour: number;
  date_id: number;
  status: boolean;
}

type attendanceCreationAttributes = Optional<attendance, "id">;
const AttendanceModel: ModelDefined<attendanceCreationAttributes, attendance> =
  sequelize.define("attendance", {
    trasaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TransactionStudentsModel,
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
    hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AttendanceDateModel,
        key: "id",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

export default AttendanceModel;
