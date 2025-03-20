package com.example.miniprojectbackend.service;

import com.example.miniprojectbackend.model.Employee;
import com.example.miniprojectbackend.model.Department;
import com.example.miniprojectbackend.repository.EmployeeRepository;
import com.example.miniprojectbackend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public Employee createEmployee(Employee employee) {
        Department department = employee.getDepartment();
        if (department != null && department.getId() != null) {
            department = departmentRepository.findById(department.getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            employee.setDepartment(department);
        }
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
            existingEmployee.setFirstName(newEmployeeData.getFirstName());
            existingEmployee.setLastName(newEmployeeData.getLastName());
            existingEmployee.setEmail(newEmployeeData.getEmail());
            existingEmployee.setJobTitle(newEmployeeData.getJobTitle());
            existingEmployee.setPhoneNumber(newEmployeeData.getPhoneNumber());
            existingEmployee.setHireDate(newEmployeeData.getHireDate());
            existingEmployee.setSalary(newEmployeeData.getSalary());
            existingEmployee.setSkills(newEmployeeData.getSkills());

            // Handle department update
            if (newEmployeeData.getDepartment() != null && newEmployeeData.getDepartment().getId() != null) {
                Department department = departmentRepository.findById(newEmployeeData.getDepartment().getId())
                        .orElseThrow(() -> new RuntimeException("Department not found"));
                existingEmployee.setDepartment(department);
            }

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
