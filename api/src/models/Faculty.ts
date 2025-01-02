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
import type { Department } from './Department'
import type { FacultyRole } from './FacultyRole'

type FacultyAssociations = 'facultyRole' | 'department'

export class Faculty extends Model<
  InferAttributes<Faculty, {omit: FacultyAssociations}>,
  InferCreationAttributes<Faculty, {omit: FacultyAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string | null
  declare email: string | null
  declare password: string | null
  declare roleId: number | null
  declare departmentId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Faculty hasOne FacultyRole
  declare facultyRole?: NonAttribute<FacultyRole>
  declare getFacultyRole: HasOneGetAssociationMixin<FacultyRole>
  declare setFacultyRole: HasOneSetAssociationMixin<FacultyRole, number>
  declare createFacultyRole: HasOneCreateAssociationMixin<FacultyRole>
  
  // Faculty hasOne Department
  declare department?: NonAttribute<Department>
  declare getDepartment: HasOneGetAssociationMixin<Department>
  declare setDepartment: HasOneSetAssociationMixin<Department, number>
  declare createDepartment: HasOneCreateAssociationMixin<Department>
  
  declare static associations: {
    facultyRole: Association<Faculty, FacultyRole>,
    department: Association<Faculty, Department>
  }

  static initModel(sequelize: Sequelize): typeof Faculty {
    Faculty.init({
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
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      roleId: {
        type: DataTypes.INTEGER
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
    
    return Faculty
  }
}
