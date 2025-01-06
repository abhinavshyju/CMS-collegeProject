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
import type { Faculty } from './Faculty'

type FacultyRoleAssociations = 'faculties'

export class FacultyRole extends Model<
  InferAttributes<FacultyRole, {omit: FacultyRoleAssociations}>,
  InferCreationAttributes<FacultyRole, {omit: FacultyRoleAssociations}>
> {
  declare id: CreationOptional<number>
  declare role: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // FacultyRole hasMany Faculty
  declare faculties?: NonAttribute<Faculty[]>
  declare getFaculties: HasManyGetAssociationsMixin<Faculty>
  declare setFaculties: HasManySetAssociationsMixin<Faculty, number>
  declare addFaculty: HasManyAddAssociationMixin<Faculty, number>
  declare addFaculties: HasManyAddAssociationsMixin<Faculty, number>
  declare createFaculty: HasManyCreateAssociationMixin<Faculty, 'facultyRoleId'>
  declare removeFaculty: HasManyRemoveAssociationMixin<Faculty, number>
  declare removeFaculties: HasManyRemoveAssociationsMixin<Faculty, number>
  declare hasFaculty: HasManyHasAssociationMixin<Faculty, number>
  declare hasFaculties: HasManyHasAssociationsMixin<Faculty, number>
  declare countFaculties: HasManyCountAssociationsMixin
  
  declare static associations: {
    faculties: Association<FacultyRole, Faculty>
  }

  static initModel(sequelize: Sequelize): typeof FacultyRole {
    FacultyRole.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      role: {
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
    
    return FacultyRole
  }
}
