import sequelize from "@/db";
import { DataTypes } from "sequelize";

export const SemesterModel = sequelize.define("semester", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default SemesterModel;
