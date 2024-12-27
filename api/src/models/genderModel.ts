import sequelize from "@/db";
import { DataTypes } from "sequelize";

const GenderModel = sequelize.define("gender", {
  gender: DataTypes.STRING,
});
export default GenderModel;
