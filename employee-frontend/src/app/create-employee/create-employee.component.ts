import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { DepartmentService } from '../department.service';
import { Department } from '../department';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{

  employee: Employee = new Employee();
  departments: Department[] = [];

  constructor(private employeeService: EmployeeService,
  private departmentService: DepartmentService,
  private router: Router) { }

  ngOnInit(): void {
    this.departmentService.getDepartmentList().subscribe(data => {
      this.departments = data;
    });
      
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(data =>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }

}
