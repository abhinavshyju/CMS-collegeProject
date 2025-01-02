const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('university_details', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      capId: {
        type: DataTypes.STRING,
        field: 'cap_id'
      },
      docNo: {
        type: DataTypes.STRING,
        field: 'doc_no'
      },
      nationality: {
        type: DataTypes.STRING,
        field: 'nationality'
      },
      navity: {
        type: DataTypes.STRING,
        field: 'navity'
      },
      religion: {
        type: DataTypes.STRING,
        field: 'religion'
      },
      regNo: {
        type: DataTypes.STRING,
        field: 'reg_no'
      },
      studentId: {
        type: DataTypes.INTEGER,
        field: 'student_id'
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
    await queryInterface.dropTable('university_details');
  },
};