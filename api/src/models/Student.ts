import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
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
import type { AdditionalInfo } from './AdditionalInfo'
import type { Class } from './Class'
import type { Contact } from './Contact'
import type { GuardianInfo } from './GuardianInfo'
import type { UniversityDetail } from './UniversityDetail'

type StudentAssociations = 'class' | 'contact' | 'guardianInfo' | 'universityDetail' | 'additionalInfo'

export class Student extends Model<
  InferAttributes<Student, {omit: StudentAssociations}>,
  InferCreationAttributes<Student, {omit: StudentAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare gender: string
  declare dob: string | null
  declare admissionNo: string | null
  declare admissionYear: string | null
  declare status: boolean | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Student belongsTo Class
  declare class?: NonAttribute<Class>
  declare getClass: BelongsToGetAssociationMixin<Class>
  declare setClass: BelongsToSetAssociationMixin<Class, number>
  declare createClass: BelongsToCreateAssociationMixin<Class>
  
  // Student hasOne Contact
  declare contact?: NonAttribute<Contact>
  declare getContact: HasOneGetAssociationMixin<Contact>
  declare setContact: HasOneSetAssociationMixin<Contact, number>
  declare createContact: HasOneCreateAssociationMixin<Contact>
  
  // Student hasOne GuardianInfo
  declare guardianInfo?: NonAttribute<GuardianInfo>
  declare getGuardianInfo: HasOneGetAssociationMixin<GuardianInfo>
  declare setGuardianInfo: HasOneSetAssociationMixin<GuardianInfo, number>
  declare createGuardianInfo: HasOneCreateAssociationMixin<GuardianInfo>
  
  // Student hasOne UniversityDetail
  declare universityDetail?: NonAttribute<UniversityDetail>
  declare getUniversityDetail: HasOneGetAssociationMixin<UniversityDetail>
  declare setUniversityDetail: HasOneSetAssociationMixin<UniversityDetail, number>
  declare createUniversityDetail: HasOneCreateAssociationMixin<UniversityDetail>
  
  // Student hasOne AdditionalInfo
  declare additionalInfo?: NonAttribute<AdditionalInfo>
  declare getAdditionalInfo: HasOneGetAssociationMixin<AdditionalInfo>
  declare setAdditionalInfo: HasOneSetAssociationMixin<AdditionalInfo, number>
  declare createAdditionalInfo: HasOneCreateAssociationMixin<AdditionalInfo>
  
  declare static associations: {
    class: Association<Student, Class>,
    contact: Association<Student, Contact>,
    guardianInfo: Association<Student, GuardianInfo>,
    universityDetail: Association<Student, UniversityDetail>,
    additionalInfo: Association<Student, AdditionalInfo>
  }

  static initModel(sequelize: Sequelize): typeof Student {
    Student.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dob: {
        type: DataTypes.STRING
      },
      admissionNo: {
        type: DataTypes.STRING
      },
      admissionYear: {
        type: DataTypes.DATEONLY
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    
    return Student
  }
}
