import sequelize from "@/db";
import { DataTypes } from "sequelize";

const FacultyRoleModel = sequelize.define("faculty-role", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default FacultyRoleModel;
