package com.example.miniprojectbackend.service;

import com.example.miniprojectbackend.model.Employee;
import com.example.miniprojectbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Optional<Employee> updateEmployee(Long id, Employee newEmployeeData) {
        return employeeRepository.findById(id).map(existingEmployee -> {
            // Update common fields
            existingEmployee.setFirstName(newEmployeeData.getFirstName());
            existingEmployee.setLastName(newEmployeeData.getLastName());
            existingEmployee.setEmail(newEmployeeData.getEmail());

            // Update IT-specific fields
            existingEmployee.setJobTitle(newEmployeeData.getJobTitle());
            existingEmployee.setDepartment(newEmployeeData.getDepartment());
            existingEmployee.setPhoneNumber(newEmployeeData.getPhoneNumber());
            existingEmployee.setHireDate(newEmployeeData.getHireDate());
            existingEmployee.setSalary(newEmployeeData.getSalary());
            existingEmployee.setSkills(newEmployeeData.getSkills());

            return employeeRepository.save(existingEmployee);
        });
    }

    public boolean deleteEmployee(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
