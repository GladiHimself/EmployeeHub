package com.employee.project.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.employee.project.dto.PageResponse;
import com.employee.project.model.Employee;
import com.employee.project.repository.DepartmentRepository;
import com.employee.project.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    public PageResponse<Employee> getAllEmployees(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName").ascending());
        Page<Employee> result = employeeRepository.findAll(pageable);
        return new PageResponse<>(result.getContent(), result.getNumber(), result.getTotalPages(), result.getTotalElements(), result.getSize());
    }

    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.searchEmployees(keyword);
    }

    public Employee createEmployee(Employee employee) {
        if (employee.getDepartment() != null && employee.getDepartment().getId() != 0) {
            departmentRepository.findById(employee.getDepartment().getId())
                .ifPresent(employee::setDepartment);
        }
        return employeeRepository.save(employee);
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found containing ID: " + id));
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found containing ID: " + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());

        if (employeeDetails.getDepartment() != null && employeeDetails.getDepartment().getId() != 0) {
            departmentRepository.findById(employeeDetails.getDepartment().getId())
                .ifPresent(employee::setDepartment);
        }
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found containing ID: " + id));
        employeeRepository.delete(employee);
    }

}
