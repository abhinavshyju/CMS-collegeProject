const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const EventModel = sequelize.define("event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
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
