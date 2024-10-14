const sequelize = require("../db");

const EventModel = sequelize.define("event", {
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
module.exports = EventModel;
