import sequelize from "@/db";
import { DataTypes } from "sequelize";

const AttendanceDateModel = sequelize.define("attendance_date", {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
export default AttendanceDateModel;
