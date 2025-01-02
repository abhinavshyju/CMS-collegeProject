const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        field: 'address',
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        field: 'phone'
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
    await queryInterface.dropTable('contacts');
  },
};