import sequelize from "@/db";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import StudentModel from "./stundentModel";
import TransactionSemesterModel from "./semesterTransactionModel";

interface TransactionStudents {
  id: number;
  student_id: number;
  semester_id: number;
}
type transactionStudentsCreationAttributes = Optional<
  TransactionStudents,
  "id"
>;
export const TransactionStudentsModel: ModelDefined<
  transactionStudentsCreationAttributes,
  TransactionStudents
> = sequelize.define("transaction_students", {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: StudentModel,
      key: "id",
    },
  },
  semester_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TransactionSemesterModel,
      key: "id",
    },
  },
});

export default TransactionStudentsModel;
