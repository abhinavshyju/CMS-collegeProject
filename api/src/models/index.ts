import type { Sequelize, Model } from 'sequelize'
import { Admin } from './Admin'
import { Student } from './Student'
import { Contact } from './Contact'
import { GuardianInfo } from './GuardianInfo'
import { UniversityDetail } from './UniversityDetail'
import { AdditionalInfo } from './AdditionalInfo'
import { Class } from './Class'
import { Department } from './Department'
import { StaffRole } from './StaffRole'
import { FacultyRole } from './FacultyRole'
import { Staff } from './Staff'
import { Faculty } from './Faculty'
import { StudentTransaction } from './StudentTransaction'
import { Semester } from './Semester'
import { SemesterTransaction } from './SemesterTransaction'
import { Attendance } from './Attendance'
import { WorkingDay } from './WorkingDay'
import { Test } from './Test'

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
  Test
}

export function initModels(sequelize: Sequelize) {
  Admin.initModel(sequelize)
  Student.initModel(sequelize)
  Contact.initModel(sequelize)
  GuardianInfo.initModel(sequelize)
  UniversityDetail.initModel(sequelize)
  AdditionalInfo.initModel(sequelize)
  Class.initModel(sequelize)
  Department.initModel(sequelize)
  StaffRole.initModel(sequelize)
  FacultyRole.initModel(sequelize)
  Staff.initModel(sequelize)
  Faculty.initModel(sequelize)
  StudentTransaction.initModel(sequelize)
  Semester.initModel(sequelize)
  SemesterTransaction.initModel(sequelize)
  Attendance.initModel(sequelize)
  WorkingDay.initModel(sequelize)
  Test.initModel(sequelize)

  Student.belongsTo(Class, {
    as: 'class',
    foreignKey: 'class_id'
  })
  Student.hasOne(Contact, {
    as: 'contact',
    foreignKey: 'student_id'
  })
  Student.hasOne(GuardianInfo, {
    as: 'guardianInfo',
    foreignKey: 'student_id'
  })
  Student.hasOne(UniversityDetail, {
    as: 'universityDetail',
    foreignKey: 'student_id'
  })
  Student.hasOne(AdditionalInfo, {
    as: 'additionalInfo',
    foreignKey: 'student_id'
  })
  Contact.hasOne(Student, {
    as: 'student',
    foreignKey: 'contact_id'
  })
  GuardianInfo.hasOne(Student, {
    as: 'student',
    foreignKey: 'guardian_info_id'
  })
  UniversityDetail.hasOne(Student, {
    as: 'student',
    foreignKey: 'university_details_id'
  })
  AdditionalInfo.hasOne(Student, {
    as: 'student',
    foreignKey: 'additional_info_id'
  })
  Class.belongsTo(Department, {
    as: 'department',
    foreignKey: 'department_id'
  })
  Class.hasMany(Student, {
    as: 'students',
    foreignKey: 'class_id'
  })
  Department.hasMany(Class, {
    as: 'classes',
    foreignKey: 'department_id'
  })
  Department.hasMany(Faculty, {
    as: 'faculties',
    foreignKey: 'department_id'
  })
  StaffRole.hasMany(Staff, {
    as: 'staffs',
    foreignKey: 'staff_role_id'
  })
  FacultyRole.hasMany(Faculty, {
    as: 'faculties',
    foreignKey: 'faculty_role_id'
  })
  Staff.belongsTo(StaffRole, {
    as: 'staffRole',
    foreignKey: 'staff_role_id'
  })
  Faculty.belongsTo(FacultyRole, {
    as: 'facultyRole',
    foreignKey: 'faculty_role_id'
  })
  Faculty.belongsTo(Department, {
    as: 'department',
    foreignKey: 'department_id'
  })
  StudentTransaction.belongsTo(Student, {
    as: 'student',
    foreignKey: 'student_id'
  })
  StudentTransaction.belongsTo(Class, {
    as: 'class',
    foreignKey: 'class_id'
  })
  StudentTransaction.belongsTo(SemesterTransaction, {
    as: 'semesterTransaction',
    foreignKey: 'semester_transaction_id'
  })
  SemesterTransaction.belongsTo(Class, {
    as: 'class',
    foreignKey: 'class_id'
  })
  SemesterTransaction.belongsTo(Semester, {
    as: 'semester',
    foreignKey: 'semester_id'
  })
  Attendance.belongsTo(StudentTransaction, {
    as: 'studentTransaction',
    foreignKey: 'student_transaction_id'
  })
  Attendance.belongsTo(WorkingDay, {
    as: 'workingDay',
    foreignKey: 'working_day_id'
  })
  Attendance.belongsTo(Faculty, {
    as: 'faculty',
    foreignKey: 'faculty_id'
  })
  WorkingDay.hasMany(Attendance, {
    as: 'attendances',
    foreignKey: 'working_day_id'
  })

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
    Test
  }
}
