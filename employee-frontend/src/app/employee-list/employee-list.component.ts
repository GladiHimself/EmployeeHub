import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  searchKeyword: string = '';

  currentPage: number = 0;
  totalPages: number = 0;
  totalElements: number = 0;
  pageSize: number = 5;

  constructor(private employeeService: EmployeeService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  private getEmployees() {
    this.employeeService.getEmployeeList(this.currentPage, this.pageSize).subscribe(data => {
      this.employees = data.content;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;
    });
  }

  onSearch(): void {
    if (this.searchKeyword.trim() === '') {
      this.currentPage = 0;
      this.getEmployees();
    } else {
      this.employeeService.searchEmployees(this.searchKeyword).subscribe(data => {
        this.employees = data;
        this.totalPages = 0;
      });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getEmployees();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getEmployees();
    }
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number) {
    if(!this.authService.isAdmin()) {
      alert('Only admin can perform this action.');
      return;
    }
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    if(!this.authService.isAdmin()) {
      alert('Only admin can perform this action.');
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    });
  }
}