import React from 'react';
import { TextField, Box } from '@mui/material';

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        marginTop: 2,
        marginBottom: 2
      }}
    >
      <Box sx={{ flex: '1 1 30%' }}>
        <TextField
          label="First Name"
          name="firstName"
          value={filters.firstName}
          onChange={onFilterChange}
          fullWidth
        />
      </Box>
      <Box sx={{ flex: '1 1 30%' }}>
        <TextField
          label="Last Name"
          name="lastName"
          value={filters.lastName}
          onChange={onFilterChange}
          fullWidth
        />
      </Box>
      <Box sx={{ flex: '1 1 30%' }}>
        <TextField
          label="Job Title"
          name="jobTitle"
          value={filters.jobTitle}
          onChange={onFilterChange}
          fullWidth
        />
      </Box>
      <Box sx={{ flex: '1 1 30%' }}>
        <TextField
          label="Department"
          name="department"
          value={filters.department}
          onChange={onFilterChange}
          fullWidth
        />
      </Box>
      <Box sx={{ flex: '1 1 30%' }}>
        <TextField
          label="Salary"
          name="salary"
          value={filters.salary}
          onChange={onFilterChange}
          fullWidth
        />
      </Box>
      <Box sx={{ flex: '1 1 30%' }}>
        <TextField
          label="Skills"
          name="skills"
          value={filters.skills}
          onChange={onFilterChange}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default FilterBar;
