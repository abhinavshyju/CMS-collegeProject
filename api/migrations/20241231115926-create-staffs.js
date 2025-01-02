const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('staffs', {
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
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      staffRoleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'staff_role_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('staffs');
  },
};