const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('working_days', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        field: 'date'
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
    await queryInterface.dropTable('working_days');
  },
};