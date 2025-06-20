import axios from "axios";
import "../styles/EmployeeTable.css";

const EmployeeTable = ({ employees, setEditingEmp, fetchEmployees }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    }
  };

  return (
    <table className="emp-table">
      <thead>
        <tr>
          <th>Photo</th><th>Name</th><th>ID</th><th>Dept</th><th>Designation</th>
          <th>Project</th><th>Type</th><th>Status</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td><img src={`http://localhost:5000${emp.photo}`} alt="Profile" /></td>
            <td>{emp.name}</td>
            <td>{emp.emp_id}</td>
            <td>{emp.department}</td>
            <td>{emp.designation}</td>
            <td>{emp.project}</td>
            <td>{emp.type}</td>
            <td>{emp.status}</td>
            <td>
              <button onClick={() => setEditingEmp(emp)}>✏️</button>
              <button onClick={() => handleDelete(emp.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;