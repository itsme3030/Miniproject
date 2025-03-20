import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Modal, Box } from '@mui/material';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import EmployeeService from './EmployeeService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpen = () => {
    setEditingEmployee(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await EmployeeService.deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmit = async (employee) => {
    try {
      if (editingEmployee) {
        await EmployeeService.updateEmployee(editingEmployee.id, employee);
      } else {
        await EmployeeService.createEmployee(employee);
      }
      fetchEmployees();
      handleClose();
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        IT Employee Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Employee
      </Button>
      <EmployeeList 
        employees={employees} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <EmployeeForm 
            onSubmit={handleSubmit} 
            employee={editingEmployee} 
            onCancel={handleClose} 
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
