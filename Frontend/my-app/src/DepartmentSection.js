import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, Grid } from '@mui/material';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment, getEmployeesByDepartment } from './DepartmentService';

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
    <Box>
      <Typography variant="h5" sx={{ color: '#880e4f', marginBottom: 2 }}>Manage Departments</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 3 }}>
        <TextField
          label="Department Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          sx={{ flex: '1 1 300px' }}
        />
        <TextField
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          sx={{ flex: '1 1 300px' }}
        />
        <Button variant="contained" color="secondary" type="submit" sx={{ height: '56px' }}>
          {editId ? 'Update' : 'Create'}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {departments.map((dept) => (
          <Grid item xs={12} sm={6} md={4} key={dept.id}>
            <Card sx={{ backgroundColor: '#fce4ec', borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#d81b60' }}>{dept.name}</Typography>
                <Typography variant="body2" sx={{ color: '#880e4f' }}>{dept.description}</Typography>
                <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Button size="small" variant="outlined" onClick={() => handleEdit(dept)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(dept.id)}>Delete</Button>
                  <Button size="small" variant="outlined" onClick={() => handleViewEmployees(dept.id)}>View Emp</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {employees.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="subtitle1" sx={{ color: '#ad1457' }}>Employees in Selected Department:</Typography>
          <Grid container spacing={1}>
            {employees.map((emp) => (
              <Grid item xs={12} sm={6} key={emp.id}>
                <Card sx={{ backgroundColor: '#fff3e0', borderRadius: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="body1">{emp.firstName} {emp.lastName}</Typography>
                    <Typography variant="caption">{emp.jobTitle}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default DepartmentSection;
