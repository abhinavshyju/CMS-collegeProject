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
import type { Class } from './Class'
import type { Faculty } from './Faculty'

type DepartmentAssociations = 'classes' | 'faculties'

export class Department extends Model<
  InferAttributes<Department, {omit: DepartmentAssociations}>,
  InferCreationAttributes<Department, {omit: DepartmentAssociations}>
> {
  declare id: CreationOptional<number>
  declare department: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Department hasMany Class
  declare classes?: NonAttribute<Class[]>
  declare getClasses: HasManyGetAssociationsMixin<Class>
  declare setClasses: HasManySetAssociationsMixin<Class, number>
  declare addClass: HasManyAddAssociationMixin<Class, number>
  declare addClasses: HasManyAddAssociationsMixin<Class, number>
  declare createClass: HasManyCreateAssociationMixin<Class, 'departmentId'>
  declare removeClass: HasManyRemoveAssociationMixin<Class, number>
  declare removeClasses: HasManyRemoveAssociationsMixin<Class, number>
  declare hasClass: HasManyHasAssociationMixin<Class, number>
  declare hasClasses: HasManyHasAssociationsMixin<Class, number>
  declare countClasses: HasManyCountAssociationsMixin
  
  // Department hasMany Faculty
  declare faculties?: NonAttribute<Faculty[]>
  declare getFaculties: HasManyGetAssociationsMixin<Faculty>
  declare setFaculties: HasManySetAssociationsMixin<Faculty, number>
  declare addFaculty: HasManyAddAssociationMixin<Faculty, number>
  declare addFaculties: HasManyAddAssociationsMixin<Faculty, number>
  declare createFaculty: HasManyCreateAssociationMixin<Faculty, 'departmentId'>
  declare removeFaculty: HasManyRemoveAssociationMixin<Faculty, number>
  declare removeFaculties: HasManyRemoveAssociationsMixin<Faculty, number>
  declare hasFaculty: HasManyHasAssociationMixin<Faculty, number>
  declare hasFaculties: HasManyHasAssociationsMixin<Faculty, number>
  declare countFaculties: HasManyCountAssociationsMixin
  
  declare static associations: {
    classes: Association<Department, Class>,
    faculties: Association<Department, Faculty>
  }

  static initModel(sequelize: Sequelize): typeof Department {
    Department.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      department: {
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
    
    return Department
  }
}
