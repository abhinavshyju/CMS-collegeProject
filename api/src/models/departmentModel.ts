import sequelize from "@/db";
import { DataTypes } from "sequelize";

const DepartmentModel = sequelize.define("department", {
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default DepartmentModel;
