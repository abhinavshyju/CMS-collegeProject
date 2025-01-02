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

type StudentAssociations = "class";

export class Student extends Model<
  InferAttributes<Student, { omit: StudentAssociations }>,
  InferCreationAttributes<Student, { omit: StudentAssociations }>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare gender: string;
  declare dob: string | null;
  declare admissionNo: string | null;
  declare admissionYear: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Student hasOne Class
  declare class?: NonAttribute<Class>;
  declare getClass: HasOneGetAssociationMixin<Class>;
  declare setClass: HasOneSetAssociationMixin<Class, number>;
  declare createClass: HasOneCreateAssociationMixin<Class>;

  declare static associations: {
    class: Association<Student, Class>;
  };

  static initModel(sequelize: Sequelize): typeof Student {
    Student.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dob: {
          type: DataTypes.STRING,
        },
        admissionNo: {
          type: DataTypes.STRING,
        },
        admissionYear: {
          type: DataTypes.DATEONLY,
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

    return Student;
  }
}
