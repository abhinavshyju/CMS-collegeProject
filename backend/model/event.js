const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Event = sequelize.define("Event", {
  titel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  published_by: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = { Event };
