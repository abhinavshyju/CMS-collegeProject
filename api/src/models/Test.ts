import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'

export class Test extends Model<
  InferAttributes<Test>,
  InferCreationAttributes<Test>
> {
  declare id: CreationOptional<number>
  declare test: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  
  static initModel(sequelize: Sequelize): typeof Test {
    Test.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      test: {
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
    
    return Test
  }
}
