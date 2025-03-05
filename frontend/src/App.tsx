import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Employee } from './types/employee';
import { EmployeeCard } from './components/EmployeeCard';
import { EmployeeForm } from './components/EmployeeForm';

// Sample data
const initialEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    position: 'Software Engineer',
    department: 'Engineering',
    joinDate: '2023-01-15',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    position: 'Product Manager',
    department: 'Product',
    joinDate: '2022-11-01',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();

  const filteredEmployees = employees.filter(employee => {
    const searchString = `${employee.firstName} ${employee.lastName} ${employee.position} ${employee.department}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const handleAddEmployee = (data: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...data,
      id: String(Date.now())
    };
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  const handleEditEmployee = (data: Omit<Employee, 'id'>) => {
    if (!editingEmployee) return;
    const updatedEmployees = employees.map(emp =>
      emp.id === editingEmployee.id ? { ...data, id: emp.id } : emp
    );
    setEmployees(updatedEmployees);
    setEditingEmployee(undefined);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Employee
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEmployees.map(employee => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {(showForm || editingEmployee) && (
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
            onClose={() => {
              setShowForm(false);
              setEditingEmployee(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;