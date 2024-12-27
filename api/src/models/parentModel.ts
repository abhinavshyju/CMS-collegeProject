const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const StudentModel = require("./stundentModel");

const ParentModel = sequelize.define("parent", {
  name: {
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
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: StudentModel,
      key: "id",
    },
  },
});
module.exports = ParentModel;
