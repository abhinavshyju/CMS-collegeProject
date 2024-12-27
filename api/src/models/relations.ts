import AdditionalInfoModel from "./additionInfoModel";
import AttendanceModel from "./attendaceModel";
import AttendanceDateModel from "./attendanceDateModel";
import ClassModel from "./classModel";
import ContactModel from "./contactModel";
import FacultyModel from "./facultyModel";
import FacultyRoleModel from "./facultyRoleModel";
import GenderModel from "./genderModel";
import GuardianInfoModel from "./guardianInfoModel";
import StaffModel from "./staffModel";
import StaffRoleModel from "./staffRoleModel";
import StudentModel from "./stundentModel";
import UniversityDetailsModel from "./universityDetailsModel";

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

  StaffModel.belongsTo(StaffRoleModel, { foreignKey: "role_id" });
  StaffRoleModel.hasMany(StaffModel, { foreignKey: "role_id" });

  FacultyModel.belongsTo(FacultyRoleModel, { foreignKey: "role_id" });
  FacultyRoleModel.hasMany(FacultyModel, { foreignKey: "role_id" });

  AttendanceModel.belongsTo(FacultyModel, { foreignKey: "faculty_id" });
  FacultyModel.hasMany(AttendanceModel, { foreignKey: "faculty_id" });

  AttendanceModel.belongsTo(AttendanceDateModel, { foreignKey: "date_id" });
  AttendanceDateModel.hasMany(AttendanceModel, { foreignKey: "date_id" });

  AttendanceModel.belongsTo(StudentModel, { foreignKey: "student_id" });
  StudentModel.hasMany(AttendanceModel, { foreignKey: "student_id" });
};

export default RelationsJoin;
