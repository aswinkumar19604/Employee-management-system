import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import employeeRoutes from "./routes/employees.js";

const app = express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/employees", employeeRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
