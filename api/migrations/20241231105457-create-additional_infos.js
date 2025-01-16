const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('additional_infos', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      exService: {
        type: DataTypes.BOOLEAN,
        field: 'ex_service',
        defaultValue: false
      },
      disability: {
        type: DataTypes.BOOLEAN,
        field: 'disability',
        defaultValue: false
      },
      nssVol: {
        type: DataTypes.BOOLEAN,
        field: 'nss_vol',
        defaultValue: false
      },
      aGrade: {
        type: DataTypes.BOOLEAN,
        field: 'a_grade',
        defaultValue: false
      },
      ihrdtss: {
        type: DataTypes.BOOLEAN,
        field: 'ihrdtss',
        defaultValue: false
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
    await queryInterface.dropTable('additional_infos');
  },
};