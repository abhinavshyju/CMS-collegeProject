const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const AdditionalInfoModel = require("./additionInfoModel");
const ContactModel = require("./contactModel");
const GenderModel = require("./genderModel");
const GuardianInfoModel = require("./guardianInfoModel");
const UniversityDetailsModel = require("./universityDetailsModel");
const ClassModel = require("./classModel");

const StudentModel = sequelize.define("student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: GenderModel,
      key: "id",
    },
  },
  contact_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ContactModel,
      key: "id",
    },
  },
  guardian_id: {
    type: DataTypes.INTEGER,
    references: {
      model: GuardianInfoModel,
      key: "id",
    },
  },
  university_id: {
    type: DataTypes.INTEGER,
    references: {
      model: UniversityDetailsModel,
      key: "id",
    },
  },
  addition_info_id: {
    type: DataTypes.INTEGER,
    references: {
      model: AdditionalInfoModel,
      key: "id",
    },
  },
  class_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ClassModel,
      key: "id",
    },
  },
});

module.exports = StudentModel;
