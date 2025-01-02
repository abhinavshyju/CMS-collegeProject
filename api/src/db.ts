import { Sequelize } from "sequelize";

const db: Sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./temp/data.sqlite",
  define: {
    underscored: true,
  },
});

export default db;
