const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendances', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: false
      },
      hour: {
        type: DataTypes.INTEGER,
        field: 'hour'
      },
      studentTransactionId: {
        type: DataTypes.INTEGER,
        field: 'student_transaction_id'
      },
      workingDayId: {
        type: DataTypes.INTEGER,
        field: 'working_day_id'
      },
      facultyId: {
        type: DataTypes.INTEGER,
        field: 'faculty_id'
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
    await queryInterface.dropTable('attendances');
  },
};