import sequelize from "@/db";

const HourModel = sequelize.define("hour", {
  hour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = HourModel;
