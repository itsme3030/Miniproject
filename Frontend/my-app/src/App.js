import React from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';
import DepartmentSection from './DepartmentSection';
import EmployeeSection from './EmployeeSection';

function App() {
  return (
    <Container maxWidth="lg" sx={{ padding: '2rem', backgroundColor: '#fff0f6', minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ fontFamily: 'Comic Sans MS, cursive', color: '#d81b60' }}>
        Department & Employee Management
      </Typography>
      <Divider sx={{ marginBottom: '2rem', borderColor: '#f8bbd0' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DepartmentSection />
        <EmployeeSection />
      </Box>
    </Container>
  );
}

export default App;
