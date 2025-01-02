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
import type { Student } from './Student'

type GuardianInfoAssociations = 'student'

export class GuardianInfo extends Model<
  InferAttributes<GuardianInfo, {omit: GuardianInfoAssociations}>,
  InferCreationAttributes<GuardianInfo, {omit: GuardianInfoAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string | null
  declare mottherName: string | null
  declare phone: string | null
  declare annualIncome: number | null
  declare studentId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // GuardianInfo belongsTo Student
  declare student?: NonAttribute<Student>
  declare getStudent: BelongsToGetAssociationMixin<Student>
  declare setStudent: BelongsToSetAssociationMixin<Student, number>
  declare createStudent: BelongsToCreateAssociationMixin<Student>
  
  declare static associations: {
    student: Association<GuardianInfo, Student>
  }

  static initModel(sequelize: Sequelize): typeof GuardianInfo {
    GuardianInfo.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      mottherName: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      annualIncome: {
        type: DataTypes.INTEGER
      },
      studentId: {
        type: DataTypes.STRING
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
    
    return GuardianInfo
  }
}
