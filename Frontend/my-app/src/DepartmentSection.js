import React, { useState, useEffect } from 'react';
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getEmployeesByDepartment,
} from './DepartmentService';

function DepartmentSection() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const data = await getAllDepartments();
    setDepartments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDepartment(editId, formData);
    } else {
      await createDepartment(formData);
    }
    setFormData({ name: '', description: '' });
    setEditId(null);
    fetchDepartments();
  };

  const handleEdit = (dept) => {
    setFormData({ name: dept.name, description: dept.description });
    setEditId(dept.id);
  };

  const handleDelete = async (id) => {
    await deleteDepartment(id);
    fetchDepartments();
  };

  const handleViewEmployees = async (deptId) => {
    const empData = await getEmployeesByDepartment(deptId);
    setEmployees(empData);
  };

  return (
    <div>
      <h2 style={{ color: '#880e4f' }}>Manage Departments</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <input
          type="text"
          placeholder="Department Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          style={{ flex: '1 1 300px', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          style={{ flex: '1 1 300px', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', height: '42px' }}>
          {editId ? 'Update' : 'Create'}
        </button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {departments.map((dept) => (
          <div
            key={dept.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#fce4ec',
              flex: '1 1 300px',
            }}
          >
            <h3 style={{ color: '#d81b60' }}>{dept.name}</h3>
            <p style={{ color: '#880e4f' }}>{dept.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => handleEdit(dept)}
                style={{ padding: '0.25rem 0.5rem' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(dept.id)}
                style={{ padding: '0.25rem 0.5rem', color: 'red' }}
              >
                Delete
              </button>
        
            </div>
          </div>
        ))}
      </div>
      {employees.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ color: '#ad1457' }}>
            Employees in Selected Department:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {employees.map((emp) => (
              <div
                key={emp.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  backgroundColor: '#fff3e0',
                  flex: '1 1 250px',
                }}
              >
                <p>
                  {emp.firstName} {emp.lastName}
                </p>
                <small>{emp.jobTitle}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentSection;
