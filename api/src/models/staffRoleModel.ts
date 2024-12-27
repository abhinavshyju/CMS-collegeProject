import sequelize from "@/db";
import { DataTypes, ModelDefined, Optional } from "sequelize";
interface staffRole {
  id: number;
  role: string;
}

type staffRoleCreationAttributes = Optional<staffRole, "id">;
const StaffRoleModel: ModelDefined<staffRole, staffRoleCreationAttributes> =
  sequelize.define("staff-role", {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

export default StaffRoleModel;
