const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("students", {
      fields: ["student_transaction_id"],
      type: "foreign key",
      name: "students_student_transaction_id_fkey",
      references: {
        table: "student_transactions",
        field: "id",
      },
    });

    await queryInterface.addConstraint("contacts", {
      fields: ["student_id"],
      type: "foreign key",
      name: "contacts_student_id_fkey",
      references: {
        table: "students",
        field: "id",
      },
    });

    await queryInterface.addConstraint("guardian_infos", {
      fields: ["student_id"],
      type: "foreign key",
      name: "guardian_infos_student_id_fkey",
      references: {
        table: "students",
        field: "id",
      },
    });

    await queryInterface.addConstraint("university_details", {
      fields: ["student_id"],
      type: "foreign key",
      name: "university_details_student_id_fkey",
      references: {
        table: "students",
        field: "id",
      },
    });

    await queryInterface.addConstraint("additional_infos", {
      fields: ["student_id"],
      type: "foreign key",
      name: "additional_infos_student_id_fkey",
      references: {
        table: "students",
        field: "id",
      },
    });

    await queryInterface.addConstraint("classes", {
      fields: ["department_id"],
      type: "foreign key",
      name: "classes_department_id_fkey",
      references: {
        table: "departments",
        field: "id",
      },
    });

    await queryInterface.addConstraint("classes", {
      fields: ["student_id"],
      type: "foreign key",
      name: "classes_student_id_fkey",
      references: {
        table: "students",
        field: "id",
      },
    });

    await queryInterface.addConstraint("classes", {
      fields: ["student_transaction_id"],
      type: "foreign key",
      name: "classes_student_transaction_id_fkey",
      references: {
        table: "student_transactions",
        field: "id",
      },
    });

    await queryInterface.addConstraint("classes", {
      fields: ["semester_transaction_id"],
      type: "foreign key",
      name: "classes_semester_transaction_id_fkey",
      references: {
        table: "semester_transactions",
        field: "id",
      },
    });

    await queryInterface.addConstraint("departments", {
      fields: ["faculty_id"],
      type: "foreign key",
      name: "departments_faculty_id_fkey",
      references: {
        table: "faculties",
        field: "id",
      },
    });

    await queryInterface.addConstraint("staff_roles", {
      fields: ["staff_id"],
      type: "foreign key",
      name: "staff_roles_staff_id_fkey",
      references: {
        table: "staffs",
        field: "id",
      },
    });

    await queryInterface.addConstraint("faculty_roles", {
      fields: ["faculty_id"],
      type: "foreign key",
      name: "faculty_roles_faculty_id_fkey",
      references: {
        table: "faculties",
        field: "id",
      },
    });

    await queryInterface.addConstraint("staffs", {
      fields: ["staff_role_id"],
      type: "foreign key",
      name: "staffs_staff_role_id_fkey",
      references: {
        table: "staff_roles",
        field: "id",
      },
    });

    await queryInterface.addConstraint("faculties", {
      fields: ["department_id"],
      type: "foreign key",
      name: "faculties_department_id_fkey",
      references: {
        table: "departments",
        field: "id",
      },
    });

    await queryInterface.addConstraint("faculties", {
      fields: ["faculty_role_id"],
      type: "foreign key",
      name: "faculties_faculty_role_id_fkey",
      references: {
        table: "faculty_roles",
        field: "id",
      },
    });

    await queryInterface.addConstraint("faculties", {
      fields: ["attendance_id"],
      type: "foreign key",
      name: "faculties_attendance_id_fkey",
      references: {
        table: "attendances",
        field: "id",
      },
    });

    await queryInterface.addConstraint("student_transactions", {
      fields: ["attendance_id"],
      type: "foreign key",
      name: "student_transactions_attendance_id_fkey",
      references: {
        table: "attendances",
        field: "id",
      },
    });

    await queryInterface.addConstraint("semesters", {
      fields: ["semester_transaction_id"],
      type: "foreign key",
      name: "semesters_semester_transaction_id_fkey",
      references: {
        table: "semester_transactions",
        field: "id",
      },
    });

    await queryInterface.addConstraint("semester_transactions", {
      fields: ["student_transaction_id"],
      type: "foreign key",
      name: "semester_transactions_student_transaction_id_fkey",
      references: {
        table: "student_transactions",
        field: "id",
      },
    });

    await queryInterface.addConstraint("attendances", {
      fields: ["working_day_id"],
      type: "foreign key",
      name: "attendances_working_day_id_fkey",
      references: {
        table: "working_days",
        field: "id",
      },
    });

    await queryInterface.addConstraint("working_days", {
      fields: ["attendance_id"],
      type: "foreign key",
      name: "working_days_attendance_id_fkey",
      references: {
        table: "attendances",
        field: "id",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "students",
      "students_student_transaction_id_fkey"
    );
    await queryInterface.removeConstraint(
      "contacts",
      "contacts_student_id_fkey"
    );
    await queryInterface.removeConstraint(
      "guardian_infos",
      "guardian_infos_student_id_fkey"
    );
    await queryInterface.removeConstraint(
      "university_details",
      "university_details_student_id_fkey"
    );
    await queryInterface.removeConstraint(
      "additional_infos",
      "additional_infos_student_id_fkey"
    );
    await queryInterface.removeConstraint(
      "classes",
      "classes_department_id_fkey"
    );
    await queryInterface.removeConstraint("classes", "classes_student_id_fkey");
    await queryInterface.removeConstraint(
      "classes",
      "classes_student_transaction_id_fkey"
    );
    await queryInterface.removeConstraint(
      "classes",
      "classes_semester_transaction_id_fkey"
    );
    await queryInterface.removeConstraint(
      "departments",
      "departments_faculty_id_fkey"
    );
    await queryInterface.removeConstraint(
      "staff_roles",
      "staff_roles_staff_id_fkey"
    );
    await queryInterface.removeConstraint(
      "faculty_roles",
      "faculty_roles_faculty_id_fkey"
    );
    await queryInterface.removeConstraint(
      "staffs",
      "staffs_staff_role_id_fkey"
    );
    await queryInterface.removeConstraint(
      "faculties",
      "faculties_department_id_fkey"
    );
    await queryInterface.removeConstraint(
      "faculties",
      "faculties_faculty_role_id_fkey"
    );
    await queryInterface.removeConstraint(
      "faculties",
      "faculties_attendance_id_fkey"
    );
    await queryInterface.removeConstraint(
      "student_transactions",
      "student_transactions_attendance_id_fkey"
    );
    await queryInterface.removeConstraint(
      "semesters",
      "semesters_semester_transaction_id_fkey"
    );
    await queryInterface.removeConstraint(
      "semester_transactions",
      "semester_transactions_student_transaction_id_fkey"
    );
    await queryInterface.removeConstraint(
      "attendances",
      "attendances_working_day_id_fkey"
    );
    await queryInterface.removeConstraint(
      "working_days",
      "working_days_attendance_id_fkey"
    );
  },
};
