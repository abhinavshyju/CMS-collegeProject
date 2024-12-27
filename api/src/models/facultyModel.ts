import sequelize from "@/db";
import { DataTypes } from "sequelize";
import FacultyRoleModel from "./facultyRoleModel";
import DepartmentModel from "./departmentModel";

const FacultyModel = sequelize.define("faculty", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: FacultyRoleModel,
      key: "id",
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DepartmentModel,
      key: "id",
    },
  },
});

export default FacultyModel;
