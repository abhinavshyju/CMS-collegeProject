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

type AdditionalInfoAssociations = 'student'

export class AdditionalInfo extends Model<
  InferAttributes<AdditionalInfo, {omit: AdditionalInfoAssociations}>,
  InferCreationAttributes<AdditionalInfo, {omit: AdditionalInfoAssociations}>
> {
  declare id: CreationOptional<number>
  declare exService: boolean | null
  declare disability: boolean | null
  declare nssVol: boolean | null
  declare aGrade: boolean | null
  declare ihrdtss: boolean | null
  declare studentId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // AdditionalInfo belongsTo Student
  declare student?: NonAttribute<Student>
  declare getStudent: BelongsToGetAssociationMixin<Student>
  declare setStudent: BelongsToSetAssociationMixin<Student, number>
  declare createStudent: BelongsToCreateAssociationMixin<Student>
  
  declare static associations: {
    student: Association<AdditionalInfo, Student>
  }

  static initModel(sequelize: Sequelize): typeof AdditionalInfo {
    AdditionalInfo.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      exService: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      disability: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      nssVol: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      aGrade: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      ihrdtss: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    
    return AdditionalInfo
  }
}
