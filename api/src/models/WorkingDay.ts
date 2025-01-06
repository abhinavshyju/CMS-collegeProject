import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize'
import type { Attendance } from './Attendance'

type WorkingDayAssociations = 'attendances'

export class WorkingDay extends Model<
  InferAttributes<WorkingDay, {omit: WorkingDayAssociations}>,
  InferCreationAttributes<WorkingDay, {omit: WorkingDayAssociations}>
> {
  declare id: CreationOptional<number>
  declare date: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // WorkingDay hasMany Attendance
  declare attendances?: NonAttribute<Attendance[]>
  declare getAttendances: HasManyGetAssociationsMixin<Attendance>
  declare setAttendances: HasManySetAssociationsMixin<Attendance, number>
  declare addAttendance: HasManyAddAssociationMixin<Attendance, number>
  declare addAttendances: HasManyAddAssociationsMixin<Attendance, number>
  declare createAttendance: HasManyCreateAssociationMixin<Attendance, 'workingDayId'>
  declare removeAttendance: HasManyRemoveAssociationMixin<Attendance, number>
  declare removeAttendances: HasManyRemoveAssociationsMixin<Attendance, number>
  declare hasAttendance: HasManyHasAssociationMixin<Attendance, number>
  declare hasAttendances: HasManyHasAssociationsMixin<Attendance, number>
  declare countAttendances: HasManyCountAssociationsMixin
  
  declare static associations: {
    attendances: Association<WorkingDay, Attendance>
  }

  static initModel(sequelize: Sequelize): typeof WorkingDay {
    WorkingDay.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY
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
    
    return WorkingDay
  }
}
