import React, { useState, useEffect } from 'react';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from './EmployeeService';
import { getAllDepartments } from './DepartmentService';

function EmployeeSection() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    phoneNumber: '',
    hireDate: '',
    salary: '',
    skills: '',
    departmentId: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = { ...formData, department: { id: formData.departmentId } };
    try {
      if (editId) {
        await updateEmployee(editId, employeeData);
      } else {
        await createEmployee(employeeData);
      }
      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (emp) => {
    setFormData({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      jobTitle: emp.jobTitle,
      phoneNumber: emp.phoneNumber || '',
      hireDate: emp.hireDate || '',
      salary: emp.salary || '',
      skills: emp.skills || '',
      departmentId: emp.department ? emp.department.id : '',
    });
    setEditId(emp.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      phoneNumber: '',
      hireDate: '',
      salary: '',
      skills: '',
      departmentId: '',
    });
    setEditId(null);
  };

  return (
    <div>
      <h2 style={{ color: '#1565c0' }}>Manage Employees</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <input
          type="date"
          placeholder="Hire Date"
          value={formData.hireDate}
          onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <select
          value={formData.departmentId}
          onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
          required
          style={{ padding: '0.5rem' }}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <div style={{ gridColumn: 'span 2' }}>
          <button type="submit" style={{ padding: '0.5rem 1rem', width: '100%' }}>
            {editId ? 'Update Employee' : 'Create Employee'}
          </button>
        </div>
      </form>
      {/* Use CSS Grid for employee listing */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        {employees.map((emp) => (
          <div
            key={emp.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#e3f2fd',
            }}
          >
            <h3 style={{ color: '#0d47a1' }}>
              {emp.firstName} {emp.lastName}
            </h3>
            <p style={{ color: '#1976d2' }}>{emp.jobTitle}</p>
            <p style={{ color: '#1565c0' }}>{emp.email}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => handleEdit(emp)} style={{ padding: '0.25rem 0.5rem' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(emp.id)} style={{ padding: '0.25rem 0.5rem', color: 'red' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeSection;
