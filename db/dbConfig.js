const { DB_USER, DB_PWD, DB_NAME, DB_SERVER } = process.env;

const sqlConfig = {
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  server: DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};
module.exports = sqlConfig;
