package com.employee.project.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.employee.project.model.Employee;


public interface EmployeeRepository extends JpaRepository <Employee, Long> {

    @Query
    ("SELECT e from Employee e WHERE " +
        "LOWER(e.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
        "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
        "LOWER(e.emailId) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> searchEmployees(@Param("keyword") String keyword);

    

}
