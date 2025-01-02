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
import type { Semester } from "./Semester";

type SemesterTransactionAssociations = "class" | "semester";

export class SemesterTransaction extends Model<
  InferAttributes<
    SemesterTransaction,
    { omit: SemesterTransactionAssociations }
  >,
  InferCreationAttributes<
    SemesterTransaction,
    { omit: SemesterTransactionAssociations }
  >
> {
  declare id: CreationOptional<number>;
  declare admissionYear: string | null;
  declare startDate: string | null;
  declare endDate: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // SemesterTransaction hasOne Class
  declare class?: NonAttribute<Class>;
  declare getClass: HasOneGetAssociationMixin<Class>;
  declare setClass: HasOneSetAssociationMixin<Class, number>;
  declare createClass: HasOneCreateAssociationMixin<Class>;

  // SemesterTransaction hasOne Semester
  declare semester?: NonAttribute<Semester>;
  declare getSemester: HasOneGetAssociationMixin<Semester>;
  declare setSemester: HasOneSetAssociationMixin<Semester, number>;
  declare createSemester: HasOneCreateAssociationMixin<Semester>;

  declare static associations: {
    class: Association<SemesterTransaction, Class>;
    semester: Association<SemesterTransaction, Semester>;
  };

  static initModel(sequelize: Sequelize): typeof SemesterTransaction {
    SemesterTransaction.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        admissionYear: {
          type: DataTypes.STRING,
        },
        startDate: {
          type: DataTypes.DATEONLY,
        },
        endDate: {
          type: DataTypes.STRING,
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

    return SemesterTransaction;
  }
}
