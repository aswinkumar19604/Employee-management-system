import mysql from "mysql2";
const db = mysql.createConnection({
  host: "https://employee-management-system-k6a4.vercel.app/",
  user: "root",
  password: "Aswin@123", 
  database: "aswin",
});
export default db;
