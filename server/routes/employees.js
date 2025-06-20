import express from "express";
import db from "../db.js";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});
router.post("/", upload.single("photo"), (req, res) => {
  const { name, emp_id, department, designation, project, type, status } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : "";
  const q = "INSERT INTO employees (name, emp_id, department, designation, project, type, status, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [name, emp_id, department, designation, project, type, status, photo];
  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Employee added successfully" });
  });
});
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM employees WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted successfully" });
  });
});

router.put("/:id", upload.single("photo"), (req, res) => {
  const { name, emp_id, department, designation, project, type, status } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : req.body.existingPhoto;

  const que = `
    UPDATE employees SET name=?, emp_id=?, department=?, designation=?, project=?, type=?, status=?, photo=?
    WHERE id=?`;
  const values = [name, emp_id, department, designation, project, type, status, photo, req.params.id];

  db.query(que, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated successfully" });
  });
});

export default router;
