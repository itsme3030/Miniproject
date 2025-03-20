import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Hire Date</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.firstName}</TableCell>
              <TableCell>{emp.lastName}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.jobTitle}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.phoneNumber}</TableCell>
              <TableCell>{emp.hireDate}</TableCell>
              <TableCell>{emp.salary}</TableCell>
              <TableCell>{emp.skills}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => onEdit(emp)}>Edit</Button>
                <Button variant="outlined" color="error" onClick={() => onDelete(emp.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
