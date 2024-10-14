const sequelize = require("../db");

const UniversityDetailsModel = sequelize.define("university-info", {
  cap_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doc_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  navity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = UniversityDetailsModel;
