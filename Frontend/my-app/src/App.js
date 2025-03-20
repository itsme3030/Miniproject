import React from 'react';
import DepartmentSection from './DepartmentSection';
import EmployeeSection from './EmployeeSection';

function App() {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#fff0f6',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          fontFamily: 'Comic Sans MS, cursive',
          color: '#d81b60',
          textAlign: 'center',
        }}
      >
        Department & Employee Management
      </h1>
      <hr style={{ marginBottom: '2rem', borderColor: '#f8bbd0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <DepartmentSection />
        <EmployeeSection />
      </div>
    </div>
  );
}

export default App;
