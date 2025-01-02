const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_transactions', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      },
      attendanceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'attendance_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_transactions');
  },
};