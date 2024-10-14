const sequelize = require("../db");

const DepartmentModel = sequelize.define("department", {
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = DepartmentModel;
