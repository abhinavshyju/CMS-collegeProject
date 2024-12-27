import sequelize from "@/db";
import { DataTypes, Model, ModelDefined, Optional } from "sequelize";

interface date {
  id?: number;
  date: Date;
}
class DateModel extends Model<date> {}
DateModel.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "date" }
);
export default DateModel;
