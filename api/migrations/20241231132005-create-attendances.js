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
      studentTransactionId: {
        type: DataTypes.INTEGER,
        field: 'student_transaction_id'
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: false
      },
      dateId: {
        type: DataTypes.INTEGER,
        field: 'date_id'
      },
      hour: {
        type: DataTypes.INTEGER,
        field: 'hour'
      },
      facultyId: {
        type: DataTypes.STRING,
        field: 'faculty_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      workingDayId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'working_day_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendances');
  },
};