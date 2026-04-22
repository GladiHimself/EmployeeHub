import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  departments: Department[] = [];
  id: number;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => console.log(error),
    );

    this.departmentService.getDepartmentList().subscribe((data) => {
      this.departments = data;
    });
  }

  compareDept(d1: Department, d2: Department): boolean {
    return d1 && d2 ? d1.id === d2.id : d1 === d2;
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      (data) => {
        this.goToEmployeeList();
      },
      (error) => console.log(error),
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
