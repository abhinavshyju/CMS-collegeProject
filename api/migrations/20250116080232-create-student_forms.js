const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_forms', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        field: 'name'
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        unique: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: false
      },
      admissionNo: {
        type: DataTypes.STRING,
        field: 'admission_no'
      },
      admissionYear: {
        type: DataTypes.STRING,
        field: 'admission_year'
      },
      courseId: {
        type: DataTypes.INTEGER,
        field: 'course_id'
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
    await queryInterface.dropTable('student_forms');
  },
};