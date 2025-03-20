import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, MenuItem, Grid } from '@mui/material';
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
    departmentId: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    const data = await getAllEmployees();
    setEmployees(data);
  };

  const fetchDepartments = async () => {
    const data = await getAllDepartments();
    setDepartments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = { ...formData, department: { id: formData.departmentId } };
    if (editId) {
      await updateEmployee(editId, employeeData);
    } else {
      await createEmployee(employeeData);
    }
    resetForm();
    fetchEmployees();
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
      departmentId: emp.department ? emp.department.id : ''
    });
    setEditId(emp.id);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
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
      departmentId: ''
    });
    setEditId(null);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#1565c0', marginBottom: 2 }}>Manage Employees</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, marginBottom: 3 }}>
        <TextField label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        <TextField label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        <TextField label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <TextField label="Job Title" value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} />
        <TextField label="Phone Number" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
        <TextField label="Hire Date" type="date" value={formData.hireDate} onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })} InputLabelProps={{ shrink: true }} />
        <TextField label="Salary" type="number" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
        <TextField label="Skills" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} helperText="Comma separated" />
        <TextField
          select
          label="Department"
          value={formData.departmentId}
          onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
          required
        >
          <MenuItem value="">Select Department</MenuItem>
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ gridColumn: 'span 2' }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            {editId ? 'Update Employee' : 'Create Employee'}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {employees.map((emp) => (
          <Grid item xs={12} sm={6} md={4} key={emp.id}>
            <Card sx={{ backgroundColor: '#e3f2fd', borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#0d47a1' }}>{emp.firstName} {emp.lastName}</Typography>
                <Typography variant="body2" sx={{ color: '#1976d2' }}>{emp.jobTitle}</Typography>
                <Typography variant="caption" sx={{ color: '#1565c0' }}>{emp.email}</Typography>
                <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Button size="small" variant="outlined" onClick={() => handleEdit(emp)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(emp.id)}>Delete</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EmployeeSection;
