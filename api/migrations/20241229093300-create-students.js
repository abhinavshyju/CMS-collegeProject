const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        field: 'gender',
        allowNull: false
      },
      dob: {
        type: DataTypes.STRING,
        field: 'dob'
      },
      admissionNo: {
        type: DataTypes.STRING,
        field: 'admission_no'
      },
      admissionYear: {
        type: DataTypes.DATEONLY,
        field: 'admission_year'
      },
      classId: {
        type: DataTypes.INTEGER,
        field: 'class_id'
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
    await queryInterface.dropTable('students');
  },
};