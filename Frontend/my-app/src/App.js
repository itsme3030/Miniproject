import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Modal, Box } from '@mui/material';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import EmployeeService from './EmployeeService';
import FilterBar from './FilterBar';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    department: '',
    salary: '',
    skills: '',
  });

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredEmployees = employees.filter(emp => {
    return (
      emp.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      emp.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      emp.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase()) &&
      emp.department.toLowerCase().includes(filters.department.toLowerCase()) &&
      (filters.salary === '' || String(emp.salary).includes(filters.salary)) &&
      emp.skills.toLowerCase().includes(filters.skills.toLowerCase())
    );
  });

  return (
    <Container>
    <h1
      style={{
        fontWeight: 'bold',
        color: '#3f51b5', // Example color
        textAlign: 'center',
        marginBottom: '16px',
      }}
      >
      IT Employee Management
    </h1>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Employee
      </Button>

      {/* Filter Section */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <EmployeeList 
        employees={filteredEmployees} 
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
