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
  declare facultyRoleId: number | null
  declare departmentId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Faculty belongsTo FacultyRole
  declare facultyRole?: NonAttribute<FacultyRole>
  declare getFacultyRole: BelongsToGetAssociationMixin<FacultyRole>
  declare setFacultyRole: BelongsToSetAssociationMixin<FacultyRole, number>
  declare createFacultyRole: BelongsToCreateAssociationMixin<FacultyRole>
  
  // Faculty belongsTo Department
  declare department?: NonAttribute<Department>
  declare getDepartment: BelongsToGetAssociationMixin<Department>
  declare setDepartment: BelongsToSetAssociationMixin<Department, number>
  declare createDepartment: BelongsToCreateAssociationMixin<Department>
  
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
      facultyRoleId: {
        type: DataTypes.INTEGER
      },
      departmentId: {
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
    
    return Faculty
  }
}
