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
  Sequelize,
} from "sequelize";
import type { Class } from "./Class";
import type { SemesterTransaction } from "./SemesterTransaction";
import type { Student } from "./Student";

type StudentTransactionAssociations =
  | "student"
  | "class"
  | "semesterTransaction";

export class StudentTransaction extends Model<
  InferAttributes<StudentTransaction, { omit: StudentTransactionAssociations }>,
  InferCreationAttributes<
    StudentTransaction,
    { omit: StudentTransactionAssociations }
  >
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // StudentTransaction hasOne Student
  declare student?: NonAttribute<Student>;
  declare getStudent: HasOneGetAssociationMixin<Student>;
  declare setStudent: HasOneSetAssociationMixin<Student, number>;
  declare createStudent: HasOneCreateAssociationMixin<Student>;

  // StudentTransaction hasOne Class
  declare class?: NonAttribute<Class>;
  declare getClass: HasOneGetAssociationMixin<Class>;
  declare setClass: HasOneSetAssociationMixin<Class, number>;
  declare createClass: HasOneCreateAssociationMixin<Class>;

  // StudentTransaction hasOne SemesterTransaction
  declare semesterTransaction?: NonAttribute<SemesterTransaction>;
  declare getSemesterTransaction: HasOneGetAssociationMixin<SemesterTransaction>;
  declare setSemesterTransaction: HasOneSetAssociationMixin<
    SemesterTransaction,
    number
  >;
  declare createSemesterTransaction: HasOneCreateAssociationMixin<SemesterTransaction>;

  declare static associations: {
    student: Association<StudentTransaction, Student>;
    class: Association<StudentTransaction, Class>;
    semesterTransaction: Association<StudentTransaction, SemesterTransaction>;
  };

  static initModel(sequelize: Sequelize): typeof StudentTransaction {
    StudentTransaction.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      }
    );

    return StudentTransaction;
  }
}
