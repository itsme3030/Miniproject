import React from 'react';
import { Mail, Briefcase, Building2, Calendar } from 'lucide-react';
import { Employee } from '../types/employee';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
}

export function EmployeeCard({ employee, onEdit }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img
          src={employee.imageUrl || `https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=random`}
          alt={`${employee.firstName} ${employee.lastName}`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {employee.firstName} {employee.lastName}
          </h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{employee.position}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{employee.department}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(employee.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            employee.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {employee.status}
          </span>
          <button
            onClick={() => onEdit(employee)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}