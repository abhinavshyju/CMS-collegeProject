import {
  Association,
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize'
import type { Student } from './Student'

type UniversityDetailAssociations = 'student'

export class UniversityDetail extends Model<
  InferAttributes<UniversityDetail, {omit: UniversityDetailAssociations}>,
  InferCreationAttributes<UniversityDetail, {omit: UniversityDetailAssociations}>
> {
  declare id: CreationOptional<number>
  declare capId: string | null
  declare docNo: string | null
  declare nationality: string | null
  declare navity: string | null
  declare religion: string | null
  declare regNo: string | null
  declare studentId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // UniversityDetail hasOne Student
  declare student?: NonAttribute<Student>
  declare getStudent: HasOneGetAssociationMixin<Student>
  declare setStudent: HasOneSetAssociationMixin<Student, number>
  declare createStudent: HasOneCreateAssociationMixin<Student>
  
  declare static associations: {
    student: Association<UniversityDetail, Student>
  }

  static initModel(sequelize: Sequelize): typeof UniversityDetail {
    UniversityDetail.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      capId: {
        type: DataTypes.STRING
      },
      docNo: {
        type: DataTypes.STRING
      },
      nationality: {
        type: DataTypes.STRING
      },
      navity: {
        type: DataTypes.STRING
      },
      religion: {
        type: DataTypes.STRING
      },
      regNo: {
        type: DataTypes.STRING
      },
      studentId: {
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
    
    return UniversityDetail
  }
}
