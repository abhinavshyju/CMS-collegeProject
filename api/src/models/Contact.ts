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
import type { Student } from './Student'

type ContactAssociations = 'student'

export class Contact extends Model<
  InferAttributes<Contact, {omit: ContactAssociations}>,
  InferCreationAttributes<Contact, {omit: ContactAssociations}>
> {
  declare id: CreationOptional<number>
  declare address: string
  declare email: string
  declare phone: string | null
  declare studentId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Contact belongsTo Student
  declare student?: NonAttribute<Student>
  declare getStudent: BelongsToGetAssociationMixin<Student>
  declare setStudent: BelongsToSetAssociationMixin<Student, number>
  declare createStudent: BelongsToCreateAssociationMixin<Student>
  
  declare static associations: {
    student: Association<Contact, Student>
  }

  static initModel(sequelize: Sequelize): typeof Contact {
    Contact.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING
      },
      studentId: {
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
    
    return Contact
  }
}
