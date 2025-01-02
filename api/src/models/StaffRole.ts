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
import type { Staff } from './Staff'

type StaffRoleAssociations = 'staffs'

export class StaffRole extends Model<
  InferAttributes<StaffRole, {omit: StaffRoleAssociations}>,
  InferCreationAttributes<StaffRole, {omit: StaffRoleAssociations}>
> {
  declare id: CreationOptional<number>
  declare role: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // StaffRole hasMany Staff
  declare staffs?: NonAttribute<Staff[]>
  declare getStaffs: HasManyGetAssociationsMixin<Staff>
  declare setStaffs: HasManySetAssociationsMixin<Staff, number>
  declare addStaff: HasManyAddAssociationMixin<Staff, number>
  declare addStaffs: HasManyAddAssociationsMixin<Staff, number>
  declare createStaff: HasManyCreateAssociationMixin<Staff>
  declare removeStaff: HasManyRemoveAssociationMixin<Staff, number>
  declare removeStaffs: HasManyRemoveAssociationsMixin<Staff, number>
  declare hasStaff: HasManyHasAssociationMixin<Staff, number>
  declare hasStaffs: HasManyHasAssociationsMixin<Staff, number>
  declare countStaffs: HasManyCountAssociationsMixin
  
  declare static associations: {
    staffs: Association<StaffRole, Staff>
  }

  static initModel(sequelize: Sequelize): typeof StaffRole {
    StaffRole.init({
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
    
    return StaffRole
  }
}
