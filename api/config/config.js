module.exports = {
  development: {
    dialect: "sqlite",
    storage: process.env.SQLITE || "./tmp/db.sqlite",
  },
  test: {
    storage: process.env.SQLITE || ".tmp/data.db",
  },
  production: {
    storage: process.env.SQLITE,
  },
};
