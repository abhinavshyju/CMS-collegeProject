import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize'
import type { Faculty } from './Faculty'
import type { StudentTransaction } from './StudentTransaction'
import type { WorkingDay } from './WorkingDay'

type AttendanceAssociations = 'studentTransaction' | 'workingDay' | 'faculty'

export class Attendance extends Model<
  InferAttributes<Attendance, {omit: AttendanceAssociations}>,
  InferCreationAttributes<Attendance, {omit: AttendanceAssociations}>
> {
  declare id: CreationOptional<number>
  declare status: boolean | null
  declare hour: number | null
  declare studentTransactionId: number | null
  declare workingDayId: number | null
  declare facultyId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Attendance belongsTo StudentTransaction
  declare studentTransaction?: NonAttribute<StudentTransaction>
  declare getStudentTransaction: BelongsToGetAssociationMixin<StudentTransaction>
  declare setStudentTransaction: BelongsToSetAssociationMixin<StudentTransaction, number>
  declare createStudentTransaction: BelongsToCreateAssociationMixin<StudentTransaction>
  
  // Attendance belongsTo WorkingDay
  declare workingDay?: NonAttribute<WorkingDay>
  declare getWorkingDay: BelongsToGetAssociationMixin<WorkingDay>
  declare setWorkingDay: BelongsToSetAssociationMixin<WorkingDay, number>
  declare createWorkingDay: BelongsToCreateAssociationMixin<WorkingDay>
  
  // Attendance belongsTo Faculty
  declare faculty?: NonAttribute<Faculty>
  declare getFaculty: BelongsToGetAssociationMixin<Faculty>
  declare setFaculty: BelongsToSetAssociationMixin<Faculty, number>
  declare createFaculty: BelongsToCreateAssociationMixin<Faculty>
  
  declare static associations: {
    studentTransaction: Association<Attendance, StudentTransaction>,
    workingDay: Association<Attendance, WorkingDay>,
    faculty: Association<Attendance, Faculty>
  }

  static initModel(sequelize: Sequelize): typeof Attendance {
    Attendance.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      hour: {
        type: DataTypes.INTEGER
      },
      studentTransactionId: {
        type: DataTypes.INTEGER
      },
      workingDayId: {
        type: DataTypes.INTEGER
      },
      facultyId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })
    
    return Attendance
  }
}
