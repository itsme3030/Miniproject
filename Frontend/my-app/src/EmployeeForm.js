import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const EmployeeForm = ({ onSubmit, employee, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    department: '',
    phoneNumber: '',
    hireDate: '',
    salary: '',
    skills: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        jobTitle: employee.jobTitle || '',
        department: employee.department || '',
        phoneNumber: employee.phoneNumber || '',
        hireDate: employee.hireDate || '',
        salary: employee.salary || '',
        skills: employee.skills || '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField 
          label="First Name" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          required 
        />
        <TextField 
          label="Last Name" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          required 
        />
        <TextField 
          label="Email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <TextField 
          label="Job Title" 
          name="jobTitle" 
          value={formData.jobTitle} 
          onChange={handleChange} 
        />
        <TextField 
          label="Department" 
          name="department" 
          value={formData.department} 
          onChange={handleChange} 
        />
        <TextField 
          label="Phone Number" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
        />
        <TextField 
          label="Hire Date" 
          name="hireDate" 
          type="date" 
          value={formData.hireDate} 
          onChange={handleChange} 
          InputLabelProps={{ shrink: true }} 
        />
        <TextField 
          label="Salary" 
          name="salary" 
          type="number" 
          value={formData.salary} 
          onChange={handleChange} 
        />
        <TextField 
          label="Skills" 
          name="skills" 
          value={formData.skills} 
          onChange={handleChange} 
          helperText="Comma-separated list" 
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">Save</Button>
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EmployeeForm;
