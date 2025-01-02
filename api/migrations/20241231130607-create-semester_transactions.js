const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('semester_transactions', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      classId: {
        type: DataTypes.INTEGER,
        field: 'class_id'
      },
      admissionYear: {
        type: DataTypes.STRING,
        field: 'admission_year'
      },
      startDate: {
        type: DataTypes.DATEONLY,
        field: 'start_date'
      },
      endDate: {
        type: DataTypes.STRING,
        field: 'end_date'
      },
      semesterId: {
        type: DataTypes.INTEGER,
        field: 'semester_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      studentTransactionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'student_transaction_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('semester_transactions');
  },
};