package com.employee.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.employee.project.model.Department;
import com.employee.project.repository.DepartmentRepository;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found containing ID: " + id));
    }

    public Department createDepartment(Department department) {
        if (departmentRepository.findByName(department.getName()).isPresent()) {
            throw new RuntimeException("Department with name '" + department.getName() + "' already exists.");
        }
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department departmentDetails) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found containing ID: " + id));

        department.setName(departmentDetails.getName());
        department.setDescription(departmentDetails.getDescription());

        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found containing ID: " + id));
        departmentRepository.delete(department);
    }


}
