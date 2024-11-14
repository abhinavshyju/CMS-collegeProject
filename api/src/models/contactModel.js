const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ContactModel = sequelize.define("contact", {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ContactModel;
