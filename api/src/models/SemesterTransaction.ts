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
import type { Class } from './Class'
import type { Semester } from './Semester'

type SemesterTransactionAssociations = 'class' | 'semester'

export class SemesterTransaction extends Model<
  InferAttributes<SemesterTransaction, {omit: SemesterTransactionAssociations}>,
  InferCreationAttributes<SemesterTransaction, {omit: SemesterTransactionAssociations}>
> {
  declare id: CreationOptional<number>
  declare admissionYear: string | null
  declare startDate: string | null
  declare endDate: string | null
  declare classId: number | null
  declare semesterId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // SemesterTransaction belongsTo Class
  declare class?: NonAttribute<Class>
  declare getClass: BelongsToGetAssociationMixin<Class>
  declare setClass: BelongsToSetAssociationMixin<Class, number>
  declare createClass: BelongsToCreateAssociationMixin<Class>
  
  // SemesterTransaction belongsTo Semester
  declare semester?: NonAttribute<Semester>
  declare getSemester: BelongsToGetAssociationMixin<Semester>
  declare setSemester: BelongsToSetAssociationMixin<Semester, number>
  declare createSemester: BelongsToCreateAssociationMixin<Semester>
  
  declare static associations: {
    class: Association<SemesterTransaction, Class>,
    semester: Association<SemesterTransaction, Semester>
  }

  static initModel(sequelize: Sequelize): typeof SemesterTransaction {
    SemesterTransaction.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      admissionYear: {
        type: DataTypes.STRING
      },
      startDate: {
        type: DataTypes.DATEONLY
      },
      endDate: {
        type: DataTypes.STRING
      },
      classId: {
        type: DataTypes.INTEGER
      },
      semesterId: {
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
    
    return SemesterTransaction
  }
}
