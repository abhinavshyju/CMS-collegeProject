import sequelize from "@/db";
import { DataTypes } from "sequelize";

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

export default ContactModel;
