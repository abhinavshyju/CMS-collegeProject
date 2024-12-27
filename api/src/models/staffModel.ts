import sequelize from "@/db";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import StaffRoleModel from "./staffRoleModel";

interface staff {
  id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
}

type staffCreationAttributes = Optional<staff, "id">;
const StaffModel: ModelDefined<staff, staffCreationAttributes> =
  sequelize.define("staff", {
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
        model: StaffRoleModel,
        key: "id",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

export default StaffModel;
