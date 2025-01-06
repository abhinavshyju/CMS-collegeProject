module.exports = {
  development: {
    dialect: "sqlite",
    storage: process.env.SQLITE || "./temp/data.sqlite",
  },
  test: {
    storage: process.env.SQLITE || ".tmp/data.db",
  },
  production: {
    storage: process.env.SQLITE,
  },
};
