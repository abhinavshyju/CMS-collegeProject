const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('faculties', {
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
        field: 'email'
      },
      password: {
        type: DataTypes.STRING,
        field: 'password'
      },
      roleId: {
        type: DataTypes.INTEGER,
        field: 'role_id'
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
      facultyRoleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'faculty_role_id'
      },
      attendanceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'attendance_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('faculties');
  },
};