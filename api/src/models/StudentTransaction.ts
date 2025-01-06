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
import type { SemesterTransaction } from './SemesterTransaction'
import type { Student } from './Student'

type StudentTransactionAssociations = 'student' | 'class' | 'semesterTransaction'

export class StudentTransaction extends Model<
  InferAttributes<StudentTransaction, {omit: StudentTransactionAssociations}>,
  InferCreationAttributes<StudentTransaction, {omit: StudentTransactionAssociations}>
> {
  declare id: CreationOptional<number>
  declare studentId: number | null
  declare classId: number | null
  declare semesterTransactionId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // StudentTransaction belongsTo Student
  declare student?: NonAttribute<Student>
  declare getStudent: BelongsToGetAssociationMixin<Student>
  declare setStudent: BelongsToSetAssociationMixin<Student, number>
  declare createStudent: BelongsToCreateAssociationMixin<Student>
  
  // StudentTransaction belongsTo Class
  declare class?: NonAttribute<Class>
  declare getClass: BelongsToGetAssociationMixin<Class>
  declare setClass: BelongsToSetAssociationMixin<Class, number>
  declare createClass: BelongsToCreateAssociationMixin<Class>
  
  // StudentTransaction belongsTo SemesterTransaction
  declare semesterTransaction?: NonAttribute<SemesterTransaction>
  declare getSemesterTransaction: BelongsToGetAssociationMixin<SemesterTransaction>
  declare setSemesterTransaction: BelongsToSetAssociationMixin<SemesterTransaction, number>
  declare createSemesterTransaction: BelongsToCreateAssociationMixin<SemesterTransaction>
  
  declare static associations: {
    student: Association<StudentTransaction, Student>,
    class: Association<StudentTransaction, Class>,
    semesterTransaction: Association<StudentTransaction, SemesterTransaction>
  }

  static initModel(sequelize: Sequelize): typeof StudentTransaction {
    StudentTransaction.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      studentId: {
        type: DataTypes.INTEGER
      },
      classId: {
        type: DataTypes.INTEGER
      },
      semesterTransactionId: {
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
    
    return StudentTransaction
  }
}
