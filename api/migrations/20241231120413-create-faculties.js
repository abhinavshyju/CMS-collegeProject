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
      facultyRoleId: {
        type: DataTypes.INTEGER,
        field: 'faculty_role_id'
      },
      departmentId: {
        type: DataTypes.STRING,
        field: 'department_id'
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
    await queryInterface.dropTable('faculties');
  },
};