const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      class: {
        type: DataTypes.STRING,
        field: 'class'
      },
      departmentId: {
        type: DataTypes.INTEGER,
        field: 'department_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      studentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'student_id'
      },
      studentTransactionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'student_transaction_id'
      },
      semesterTransactionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'semester_transaction_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('classes');
  },
};