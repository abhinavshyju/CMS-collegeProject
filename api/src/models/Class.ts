import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
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
import type { Department } from './Department'
import type { Student } from './Student'

type ClassAssociations = 'department' | 'students'

export class Class extends Model<
  InferAttributes<Class, {omit: ClassAssociations}>,
  InferCreationAttributes<Class, {omit: ClassAssociations}>
> {
  declare id: CreationOptional<number>
  declare class: string | null
  declare departmentId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Class belongsTo Department
  declare department?: NonAttribute<Department>
  declare getDepartment: BelongsToGetAssociationMixin<Department>
  declare setDepartment: BelongsToSetAssociationMixin<Department, number>
  declare createDepartment: BelongsToCreateAssociationMixin<Department>
  
  // Class hasMany Student
  declare students?: NonAttribute<Student[]>
  declare getStudents: HasManyGetAssociationsMixin<Student>
  declare setStudents: HasManySetAssociationsMixin<Student, number>
  declare addStudent: HasManyAddAssociationMixin<Student, number>
  declare addStudents: HasManyAddAssociationsMixin<Student, number>
  declare createStudent: HasManyCreateAssociationMixin<Student>
  declare removeStudent: HasManyRemoveAssociationMixin<Student, number>
  declare removeStudents: HasManyRemoveAssociationsMixin<Student, number>
  declare hasStudent: HasManyHasAssociationMixin<Student, number>
  declare hasStudents: HasManyHasAssociationsMixin<Student, number>
  declare countStudents: HasManyCountAssociationsMixin
  
  declare static associations: {
    department: Association<Class, Department>,
    students: Association<Class, Student>
  }

  static initModel(sequelize: Sequelize): typeof Class {
    Class.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      class: {
        type: DataTypes.STRING
      },
      departmentId: {
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
    
    return Class
  }
}
