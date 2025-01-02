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
import type { Faculty } from "./Faculty";
import type { StudentTransaction } from "./StudentTransaction";
import type { WorkingDay } from "./WorkingDay";

type AttendanceAssociations = "studentTransaction" | "workingDay" | "faculty";

export class Attendance extends Model<
  InferAttributes<Attendance, { omit: AttendanceAssociations }>,
  InferCreationAttributes<Attendance, { omit: AttendanceAssociations }>
> {
  declare id: CreationOptional<number>;
  declare status: boolean | null;
  declare hour: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Attendance hasOne StudentTransaction
  declare studentTransaction?: NonAttribute<StudentTransaction>;
  declare getStudentTransaction: HasOneGetAssociationMixin<StudentTransaction>;
  declare setStudentTransaction: HasOneSetAssociationMixin<
    StudentTransaction,
    number
  >;
  declare createStudentTransaction: HasOneCreateAssociationMixin<StudentTransaction>;

  // Attendance hasOne WorkingDay
  declare workingDay?: NonAttribute<WorkingDay>;
  declare getWorkingDay: HasOneGetAssociationMixin<WorkingDay>;
  declare setWorkingDay: HasOneSetAssociationMixin<WorkingDay, number>;
  declare createWorkingDay: HasOneCreateAssociationMixin<WorkingDay>;

  // Attendance hasOne Faculty
  declare faculty?: NonAttribute<Faculty>;
  declare getFaculty: HasOneGetAssociationMixin<Faculty>;
  declare setFaculty: HasOneSetAssociationMixin<Faculty, number>;
  declare createFaculty: HasOneCreateAssociationMixin<Faculty>;

  declare static associations: {
    studentTransaction: Association<Attendance, StudentTransaction>;
    workingDay: Association<Attendance, WorkingDay>;
    faculty: Association<Attendance, Faculty>;
  };

  static initModel(sequelize: Sequelize): typeof Attendance {
    Attendance.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        hour: {
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

    return Attendance;
  }
}
