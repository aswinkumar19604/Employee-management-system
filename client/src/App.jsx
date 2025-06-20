import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmp, setEditingEmp] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const fetchEmployees = async () => {
  const res= await axios.get("http://localhost:5000/api/employees")
  setEmployees(res.data)
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId) return;
    const found = employees.find(emp => emp.emp_id === searchId);
    if (found) {
      setSearchResult(found);
    } else {
      alert("Employee not found");
      setSearchResult(null);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, background: "#f4f4f4", padding: 20 }}>
        <h2>RS-TECH</h2>
        <ul>
          <li style={{ margin: 10 }}>Employee</li>
          <li style={{ margin: 10 }}>Calendar</li>
        </ul>
      </aside>
      <main style={{ flex: 1, padding: 20 }}>
        <h1>Employee Management</h1>
        <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Employee ID"
            style={{ padding: 10, width: "250px", marginRight: 10 }}
          />
          <button type="submit" style={{ padding: "10px 15px" }}>Search</button>
        </form>
        {searchResult && (
          <div className="a"style={{
            background: "", padding: 20, borderRadius: 10,
            boxShadow: "0 0 5px", marginBottom: 20
          }}>
            <h3>Search Result:</h3>
            <img src={`http://localhost:5000${searchResult.photo}`} height="60" style={{ borderRadius: "50%" }} alt="Profile" />
            <p>Name: {searchResult.name}</p>
            <p>ID: {searchResult.emp_id}</p>
            <p>Department: {searchResult.department}</p>
            <p>Designation: {searchResult.designation}</p>
            <p>Project: {searchResult.project}</p>
            <p>Type: {searchResult.type}</p>
            <p>Status: {searchResult.status}</p>
          </div>
        )}

        <EmployeeForm
          fetchEmployees={fetchEmployees}
          editingEmp={editingEmp}
          setEditingEmp={setEditingEmp}
        />
        <EmployeeTable
          employees={employees}
          setEditingEmp={setEditingEmp}
          fetchEmployees={fetchEmployees}
        />
      </main>
    </div>
  );
}

export default App;
