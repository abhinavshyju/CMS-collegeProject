import sequelize from "@/db";
import { DataTypes } from "sequelize";

const AdminModel = sequelize.define("admin", {
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
});
module.exports = AdminModel;
