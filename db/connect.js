const sql = require("mssql");

const connectDB = (sqlConfig) => {
  return sql.connect(sqlConfig);
};

module.exports = connectDB;
