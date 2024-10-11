const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { Class } = require("./class");

const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Gender,
      key: "id",
    },
  },
  contact_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Contact,
      key: "id",
    },
  },
  guardian_id: {
    type: DataTypes.INTEGER,
    references: {
      model: GuardianInfo,
      key: "id",
    },
  },
  university_id: {
    type: DataTypes.INTEGER,
    references: {
      model: UniversityDetails,
      key: "id",
    },
  },
  addition_info_id: {
    type: DataTypes.INTEGER,
    references: {
      model: AdditionalInfo,
      key: "id",
    },
  },
  class_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: "id",
    },
  },
});

const Contact = sequelize.define("Contact", {
  adderss: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const GuardianInfo = sequelize.define("GuardianInfo", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mother_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  annual_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
const UniversityDetails = sequelize.define("UniversityDetails", {
  cap_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doc_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  navity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const AdditionalInfo = sequelize.define("AdditionalInfo", {
  ex_service_man: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  disability_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  nss_volunteer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  a_grade_insite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ihrd_tss_quota: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
const Gender = sequelize.define("Gender", { gender: DataTypes.STRING });

const StudentRelations = () => {
  Student.hasOne(Gender, {
    foreignKey: "gender_id",
  });
};

module.exports = {
  Student,
  Contact,
  AdditionalInfo,
  GuardianInfo,
  UniversityDetails,
  Gender,
  StudentRelations,
};
