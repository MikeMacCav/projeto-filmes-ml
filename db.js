// db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "SEU_ENDPOINT",   // ex: database-1.xxxxx.us-east-1.rds.amazonaws.com
  user: "SEU_USUARIO",    // geralmente "admin" ou outro
  password: "SUA_SENHA",
  database: "projeto_filmes",  // crie antes no MySQL
});

module.exports = pool;
