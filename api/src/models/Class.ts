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
  Sequelize,
} from "sequelize";
import type { Department } from "./Department";

type ClassAssociations = "department";

export class Class extends Model<
  InferAttributes<Class, { omit: ClassAssociations }>,
  InferCreationAttributes<Class, { omit: ClassAssociations }>
> {
  declare id: CreationOptional<number>;
  declare class: string | null;
  declare departmentId: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Class belongsTo Department
  declare department?: NonAttribute<Department>;
  declare getDepartment: BelongsToGetAssociationMixin<Department>;
  declare setDepartment: BelongsToSetAssociationMixin<Department, number>;
  declare createDepartment: BelongsToCreateAssociationMixin<Department>;

  declare static associations: {
    department: Association<Class, Department>;
  };

  static initModel(sequelize: Sequelize): typeof Class {
    Class.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        class: {
          type: DataTypes.STRING,
        },
        departmentId: {
          type: DataTypes.INTEGER,
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

    return Class;
  }
}
