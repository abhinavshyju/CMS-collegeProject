import sequelize from "@/db";
import GenderModel from "./genderModel";
import { DataTypes } from "sequelize";
import ContactModel from "./contactModel";
import GuardianInfoModel from "./guardianInfoModel";
import UniversityDetailsModel from "./universityDetailsModel";
import AdditionalInfoModel from "./additionInfoModel";
import ClassModel from "./classModel";

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
  admission_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export default StudentModel;
