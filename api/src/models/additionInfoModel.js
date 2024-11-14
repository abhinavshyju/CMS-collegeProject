const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const AdditionalInfoModel = sequelize.define("additional-info", {
  ex_service_man: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  disability_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  nss_volunteer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  a_grade_insite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ihrd_tss_quota: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
module.exports = AdditionalInfoModel;
