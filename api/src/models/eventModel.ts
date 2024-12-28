import sequelize from "@/db";
import { DataTypes } from "sequelize";

const EventModel = sequelize.define("event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.JSON,
    allowNull: false,
  },

  published_by: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});
module.exports = EventModel;
