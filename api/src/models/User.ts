import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>
  declare username: string | null
  declare password: string | null
  declare role: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  
  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
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
    
    return User
  }
}
