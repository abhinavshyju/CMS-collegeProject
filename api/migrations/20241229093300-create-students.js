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
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      classId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'class_id'
      },
      contactId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'contact_id'
      },
      guardianInfoId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'guardian_info_id'
      },
      universityDetailsId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'university_details_id'
      },
      additionalInfoId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'additional_info_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students');
  },
};