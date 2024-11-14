const AdditionalInfoModel = require("./additionInfoModel");
const ClassModel = require("./classModel");
const ContactModel = require("./contactModel");
const FacultyModel = require("./facultyModel");
const FacultyRoleModel = require("./facultyRoleModel");
const GenderModel = require("./genderModel");
const GuardianInfoModel = require("./guardianInfoModel");
const RoleModel = require("./RoleModel");
const StaffModel = require("./staffModel");
const StudentModel = require("./stundentModel");
const UniversityDetailsModel = require("./universityDetailsModel");

const RelationsJoin = () => {
  StudentModel.belongsTo(UniversityDetailsModel, {
    foreignKey: "university_id",
  });
  UniversityDetailsModel.hasOne(StudentModel, { foreignKey: "university_id" });

  StudentModel.belongsTo(GenderModel, { foreignKey: "gender_id" });
  GenderModel.hasMany(StudentModel, { foreignKey: "gender_id" });

  StudentModel.belongsTo(ContactModel, { foreignKey: "contact_id" });
  ContactModel.hasOne(StudentModel, { foreignKey: "contact_id" });

  StudentModel.belongsTo(GuardianInfoModel, { foreignKey: "guardian_id" });
  GuardianInfoModel.hasOne(StudentModel, { foreignKey: "guardian_id" });

  StudentModel.belongsTo(AdditionalInfoModel, {
    foreignKey: "addition_info_id",
  });
  AdditionalInfoModel.hasOne(StudentModel, { foreignKey: "addition_info_id" });

  StudentModel.belongsTo(ClassModel, { foreignKey: "class_id" });
  ClassModel.hasOne(StudentModel, { foreignKey: "class_id" });

  StaffModel.belongsTo(RoleModel, { foreignKey: "role_id" });
  RoleModel.hasMany(StaffModel, { foreignKey: "role_id" });

  FacultyModel.belongsTo(FacultyRoleModel, { foreignKey: "role_id" });
  FacultyRoleModel.hasMany(FacultyModel, { foreignKey: "role_id" });
};

module.exports = RelationsJoin;
