module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSSWORD,
    database: process.env.DB_DATABASE,
    host: "localhost",
    dialect: "mysql",
    migrationStorageTableName: "migrations",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    migrationStorageTableName: "migrations",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    migrationStorageTableName: "migrations",
  },
};
