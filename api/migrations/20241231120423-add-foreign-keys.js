const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('students', {
      fields: ['class_id'],
      type: 'foreign key',
      name: 'students_class_id_fkey',
      references: {
        table: 'classes',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('contacts', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'contacts_student_id_fkey',
      references: {
        table: 'students',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('guardian_infos', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'guardian_infos_student_id_fkey',
      references: {
        table: 'students',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('university_details', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'university_details_student_id_fkey',
      references: {
        table: 'students',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('additional_infos', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'additional_infos_student_id_fkey',
      references: {
        table: 'students',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('classes', {
      fields: ['department_id'],
      type: 'foreign key',
      name: 'classes_department_id_fkey',
      references: {
        table: 'departments',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('classes', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'classes_student_id_fkey',
      references: {
        table: 'students',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('staff_roles', {
      fields: ['staff_id'],
      type: 'foreign key',
      name: 'staff_roles_staff_id_fkey',
      references: {
        table: 'staffs',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('staffs', {
      fields: ['staff_role_id'],
      type: 'foreign key',
      name: 'staffs_staff_role_id_fkey',
      references: {
        table: 'staff_roles',
        field: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('students', 'students_class_id_fkey')
    await queryInterface.removeConstraint('contacts', 'contacts_student_id_fkey')
    await queryInterface.removeConstraint('guardian_infos', 'guardian_infos_student_id_fkey')
    await queryInterface.removeConstraint('university_details', 'university_details_student_id_fkey')
    await queryInterface.removeConstraint('additional_infos', 'additional_infos_student_id_fkey')
    await queryInterface.removeConstraint('classes', 'classes_department_id_fkey')
    await queryInterface.removeConstraint('classes', 'classes_student_id_fkey')
    await queryInterface.removeConstraint('staff_roles', 'staff_roles_staff_id_fkey')
    await queryInterface.removeConstraint('staffs', 'staffs_staff_role_id_fkey')
  }
};