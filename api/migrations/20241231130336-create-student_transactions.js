const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_transactions', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      studentId: {
        type: DataTypes.INTEGER,
        field: 'student_id'
      },
      classId: {
        type: DataTypes.INTEGER,
        field: 'class_id'
      },
      semesterTransactionId: {
        type: DataTypes.INTEGER,
        field: 'semester_transaction_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_transactions');
  },
};