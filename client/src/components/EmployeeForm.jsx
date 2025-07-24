import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EmployeeForm.css";

const EmployeeForm = ({ fetchEmployees, editingEmp, setEditingEmp }) => {
  const [form, setForm] = useState({
    name: "", emp_id: "", department: "", designation: "",
    project: "", type: "", status: "", existingPhoto: ""
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editingEmp) {
      setForm({ ...editingEmp, existingPhoto: editingEmp.photo });
      setPreview(`employee-management-system-three-green.vercel.app
${editingEmp.photo}`);
    }
  }, [editingEmp]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    if (photo) data.append("photo", photo);

    try {
      if (editingEmp) {
        await axios.put(`employee-management-system-three-green.vercel.app
${editingEmp.id}`, data);
      } else {
        await axios.post("employee-management-system-three-green.vercel.app"
, data);
      }
      fetchEmployees();
      setForm({ name: "", emp_id: "", department: "", designation: "", project: "", type: "", status: "", existingPhoto: "" });
      setPhoto(null);
      setPreview(null);
      setEditingEmp(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="emp-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="emp_id" value={form.emp_id} onChange={handleChange} placeholder="Employee ID" required />
      </div>
      <div className="form-row">
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" />
        <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" />
      </div>
      <div className="form-row">
        <input name="project" value={form.project} onChange={handleChange} placeholder="Project" />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type" />
      </div>
      <div className="form-row">
        <input name="status" value={form.status} onChange={handleChange} placeholder="Status" />
        <input type="file" accept="image/*" onChange={handlePhoto} />
      </div>
      {preview && <img className="preview-img" src={preview} alt="Preview" />}
      <button type="submit">{editingEmp ? "Update" : "Add"} Employee</button>
    </form>
  );
};

export default EmployeeForm;
