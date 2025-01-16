const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guardian_infos', {
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
      mottherName: {
        type: DataTypes.STRING,
        field: 'motther_name'
      },
      phone: {
        type: DataTypes.STRING,
        field: 'phone'
      },
      annualIncome: {
        type: DataTypes.INTEGER,
        field: 'annual_income'
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
    await queryInterface.dropTable('guardian_infos');
  },
};