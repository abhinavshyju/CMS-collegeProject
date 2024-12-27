import sequelize from "@/db";
import DepartmentModel from "./departmentModel";
import { DataTypes } from "sequelize";

const ClassModel = sequelize.define("class", {
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DepartmentModel,
      key: "id",
    },
  },
});
export default ClassModel;
