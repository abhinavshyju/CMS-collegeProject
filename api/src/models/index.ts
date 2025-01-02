import type { Sequelize, Model } from "sequelize";
import { Admin } from "./Admin";
import { Student } from "./Student";
import { Contact } from "./Contact";
import { GuardianInfo } from "./GuardianInfo";
import { UniversityDetail } from "./UniversityDetail";
import { AdditionalInfo } from "./AdditionalInfo";
import { Class } from "./Class";
import { Department } from "./Department";
import { StaffRole } from "./StaffRole";
import { FacultyRole } from "./FacultyRole";
import { Staff } from "./Staff";
import { Faculty } from "./Faculty";
import { StudentTransaction } from "./StudentTransaction";
import { Semester } from "./Semester";
import { SemesterTransaction } from "./SemesterTransaction";
import { Attendance } from "./Attendance";
import { WorkingDay } from "./WorkingDay";

export {
  Admin,
  Student,
  Contact,
  GuardianInfo,
  UniversityDetail,
  AdditionalInfo,
  Class,
  Department,
  StaffRole,
  FacultyRole,
  Staff,
  Faculty,
  StudentTransaction,
  Semester,
  SemesterTransaction,
  Attendance,
  WorkingDay,
};

export default function initModels(sequelize: Sequelize) {
  Admin.initModel(sequelize);
  Student.initModel(sequelize);
  Contact.initModel(sequelize);
  GuardianInfo.initModel(sequelize);
  UniversityDetail.initModel(sequelize);
  AdditionalInfo.initModel(sequelize);
  Class.initModel(sequelize);
  Department.initModel(sequelize);
  StaffRole.initModel(sequelize);
  FacultyRole.initModel(sequelize);
  Staff.initModel(sequelize);
  Faculty.initModel(sequelize);
  StudentTransaction.initModel(sequelize);
  Semester.initModel(sequelize);
  SemesterTransaction.initModel(sequelize);
  Attendance.initModel(sequelize);
  WorkingDay.initModel(sequelize);

  Student.hasOne(Class, {
    as: "class",
    foreignKey: "student_id",
  });
  Contact.belongsTo(Student, {
    as: "student",
    foreignKey: "student_id",
  });
  GuardianInfo.belongsTo(Student, {
    as: "student",
    foreignKey: "student_id",
  });
  UniversityDetail.belongsTo(Student, {
    as: "student",
    foreignKey: "student_id",
  });
  AdditionalInfo.belongsTo(Student, {
    as: "student",
    foreignKey: "student_id",
  });
  Class.belongsTo(Department, {
    as: "department",
    foreignKey: "department_id",
  });
  Class.hasMany(Student, {
    as: "students",
    foreignKey: "class_id",
  });
  Department.hasMany(Class, {
    as: "classes",
    foreignKey: "department_id",
  });
  Department.hasMany(Faculty, {
    as: "faculties",
    foreignKey: "department_id",
  });
  StaffRole.hasMany(Staff, {
    as: "staffs",
    foreignKey: "staff_role_id",
  });
  FacultyRole.hasMany(Faculty, {
    as: "faculties",
    foreignKey: "faculty_role_id",
  });
  Staff.hasOne(StaffRole, {
    as: "staffRole",
    foreignKey: "staff_id",
  });
  Faculty.hasOne(FacultyRole, {
    as: "facultyRole",
    foreignKey: "faculty_id",
  });
  Faculty.hasOne(Department, {
    as: "department",
    foreignKey: "faculty_id",
  });
  StudentTransaction.hasOne(Student, {
    as: "studentId",
    foreignKey: "student_transaction_id",
  });
  StudentTransaction.hasOne(Class, {
    as: "classId",
    foreignKey: "student_transaction_id",
  });
  StudentTransaction.hasOne(SemesterTransaction, {
    as: "semesterTransactionId",
    foreignKey: "student_transaction_id",
  });
  SemesterTransaction.hasOne(Class, {
    as: "classId",
    foreignKey: "semester_transaction_id",
  });
  SemesterTransaction.hasOne(Semester, {
    as: "semesterId",
    foreignKey: "semester_transaction_id",
  });
  Attendance.hasOne(StudentTransaction, {
    as: "studentTransactionId",
    foreignKey: "attendance_id",
  });
  Attendance.hasOne(WorkingDay, {
    as: "dateId",
    foreignKey: "attendance_id",
  });
  Attendance.hasOne(Faculty, {
    as: "facultyId",
    foreignKey: "attendance_id",
  });
  WorkingDay.hasMany(Attendance, {
    as: "attendances",
    foreignKey: "working_day_id",
  });

  sequelize.authenticate();
  sequelize.sync();

  return {
    Admin,
    Student,
    Contact,
    GuardianInfo,
    UniversityDetail,
    AdditionalInfo,
    Class,
    Department,
    StaffRole,
    FacultyRole,
    Staff,
    Faculty,
    StudentTransaction,
    Semester,
    SemesterTransaction,
    Attendance,
    WorkingDay,
  };
}
