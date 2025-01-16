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
    
    await queryInterface.addConstraint('students', {
      fields: ['contact_id'],
      type: 'foreign key',
      name: 'students_contact_id_fkey',
      references: {
        table: 'contacts',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('students', {
      fields: ['guardian_info_id'],
      type: 'foreign key',
      name: 'students_guardian_info_id_fkey',
      references: {
        table: 'guardian_infos',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('students', {
      fields: ['university_details_id'],
      type: 'foreign key',
      name: 'students_university_details_id_fkey',
      references: {
        table: 'university_details',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('students', {
      fields: ['additional_info_id'],
      type: 'foreign key',
      name: 'students_additional_info_id_fkey',
      references: {
        table: 'additional_infos',
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
      fields: ['student_form_id'],
      type: 'foreign key',
      name: 'classes_student_form_id_fkey',
      references: {
        table: 'student_forms',
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
    
    await queryInterface.addConstraint('faculties', {
      fields: ['faculty_role_id'],
      type: 'foreign key',
      name: 'faculties_faculty_role_id_fkey',
      references: {
        table: 'faculty_roles',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('faculties', {
      fields: ['department_id'],
      type: 'foreign key',
      name: 'faculties_department_id_fkey',
      references: {
        table: 'departments',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('student_transactions', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'student_transactions_student_id_fkey',
      references: {
        table: 'students',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('student_transactions', {
      fields: ['class_id'],
      type: 'foreign key',
      name: 'student_transactions_class_id_fkey',
      references: {
        table: 'classes',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('student_transactions', {
      fields: ['semester_transaction_id'],
      type: 'foreign key',
      name: 'student_transactions_semester_transaction_id_fkey',
      references: {
        table: 'semester_transactions',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('semester_transactions', {
      fields: ['class_id'],
      type: 'foreign key',
      name: 'semester_transactions_class_id_fkey',
      references: {
        table: 'classes',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('semester_transactions', {
      fields: ['semester_id'],
      type: 'foreign key',
      name: 'semester_transactions_semester_id_fkey',
      references: {
        table: 'semesters',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('attendances', {
      fields: ['student_transaction_id'],
      type: 'foreign key',
      name: 'attendances_student_transaction_id_fkey',
      references: {
        table: 'student_transactions',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('attendances', {
      fields: ['working_day_id'],
      type: 'foreign key',
      name: 'attendances_working_day_id_fkey',
      references: {
        table: 'working_days',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('attendances', {
      fields: ['faculty_id'],
      type: 'foreign key',
      name: 'attendances_faculty_id_fkey',
      references: {
        table: 'faculties',
        field: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('students', 'students_class_id_fkey')
    await queryInterface.removeConstraint('students', 'students_contact_id_fkey')
    await queryInterface.removeConstraint('students', 'students_guardian_info_id_fkey')
    await queryInterface.removeConstraint('students', 'students_university_details_id_fkey')
    await queryInterface.removeConstraint('students', 'students_additional_info_id_fkey')
    await queryInterface.removeConstraint('contacts', 'contacts_student_id_fkey')
    await queryInterface.removeConstraint('guardian_infos', 'guardian_infos_student_id_fkey')
    await queryInterface.removeConstraint('university_details', 'university_details_student_id_fkey')
    await queryInterface.removeConstraint('additional_infos', 'additional_infos_student_id_fkey')
    await queryInterface.removeConstraint('classes', 'classes_department_id_fkey')
    await queryInterface.removeConstraint('classes', 'classes_student_form_id_fkey')
    await queryInterface.removeConstraint('staffs', 'staffs_staff_role_id_fkey')
    await queryInterface.removeConstraint('faculties', 'faculties_faculty_role_id_fkey')
    await queryInterface.removeConstraint('faculties', 'faculties_department_id_fkey')
    await queryInterface.removeConstraint('student_transactions', 'student_transactions_student_id_fkey')
    await queryInterface.removeConstraint('student_transactions', 'student_transactions_class_id_fkey')
    await queryInterface.removeConstraint('student_transactions', 'student_transactions_semester_transaction_id_fkey')
    await queryInterface.removeConstraint('semester_transactions', 'semester_transactions_class_id_fkey')
    await queryInterface.removeConstraint('semester_transactions', 'semester_transactions_semester_id_fkey')
    await queryInterface.removeConstraint('attendances', 'attendances_student_transaction_id_fkey')
    await queryInterface.removeConstraint('attendances', 'attendances_working_day_id_fkey')
    await queryInterface.removeConstraint('attendances', 'attendances_faculty_id_fkey')
  }
};