import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aswin@123", 
  database: "aswin",
});
export default db;
