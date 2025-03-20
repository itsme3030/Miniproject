package com.example.miniprojectbackend.service;

import com.example.miniprojectbackend.model.Department;
import com.example.miniprojectbackend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    public Optional<Department> updateDepartment(Long id, Department newDepartmentData) {
        return departmentRepository.findById(id).map(existingDepartment -> {
            existingDepartment.setName(newDepartmentData.getName());
            existingDepartment.setDescription(newDepartmentData.getDescription());
            return departmentRepository.save(existingDepartment);
        });
    }

    public boolean deleteDepartment(Long id) {
        if (departmentRepository.existsById(id)) {
            departmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
