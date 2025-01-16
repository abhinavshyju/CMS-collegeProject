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
import type { Class } from './Class'

type StudentFormAssociations = 'class'

export class StudentForm extends Model<
  InferAttributes<StudentForm, {omit: StudentFormAssociations}>,
  InferCreationAttributes<StudentForm, {omit: StudentFormAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string | null
  declare email: string | null
  declare status: boolean | null
  declare admissionNo: string | null
  declare admissionYear: string | null
  declare courseId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // StudentForm hasOne Class
  declare class?: NonAttribute<Class>
  declare getClass: HasOneGetAssociationMixin<Class>
  declare setClass: HasOneSetAssociationMixin<Class, number>
  declare createClass: HasOneCreateAssociationMixin<Class>
  
  declare static associations: {
    class: Association<StudentForm, Class>
  }

  static initModel(sequelize: Sequelize): typeof StudentForm {
    StudentForm.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      admissionNo: {
        type: DataTypes.STRING
      },
      admissionYear: {
        type: DataTypes.STRING
      },
      courseId: {
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
    
    return StudentForm
  }
}
