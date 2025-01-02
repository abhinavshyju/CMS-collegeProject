const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('semesters', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      semester: {
        type: DataTypes.STRING,
        field: 'semester'
      },
      admissionYear: {
        type: DataTypes.STRING,
        field: 'admission_year'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      semesterTransactionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'semester_transaction_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('semesters');
  },
};