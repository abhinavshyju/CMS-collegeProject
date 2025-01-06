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
import type { StaffRole } from './StaffRole'

type StaffAssociations = 'staffRole'

export class Staff extends Model<
  InferAttributes<Staff, {omit: StaffAssociations}>,
  InferCreationAttributes<Staff, {omit: StaffAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string | null
  declare email: string | null
  declare password: string | null
  declare staffRoleId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Staff belongsTo StaffRole
  declare staffRole?: NonAttribute<StaffRole>
  declare getStaffRole: BelongsToGetAssociationMixin<StaffRole>
  declare setStaffRole: BelongsToSetAssociationMixin<StaffRole, number>
  declare createStaffRole: BelongsToCreateAssociationMixin<StaffRole>
  
  declare static associations: {
    staffRole: Association<Staff, StaffRole>
  }

  static initModel(sequelize: Sequelize): typeof Staff {
    Staff.init({
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
      staffRoleId: {
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
    
    return Staff
  }
}
