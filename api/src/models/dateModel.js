const sequelize = require("../db");

const DateModel = sequelize.define("date", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
module.exports = DateModel;
