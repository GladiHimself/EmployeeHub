import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  departments: Department[] = [];

  constructor(
    private departmentService: DepartmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  private getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => {
      this.departments = data;
    });
  }

  updateDepartment(id: number) {
    if (!this.authService.isAdmin()) {
      alert('Only ADMIN can perform this action.');
      return;
    }
    this.router.navigate(['update-department', id]);
  }

  deleteDepartment(id: number) {
    if (!this.authService.isAdmin()) {
      alert('Only ADMIN can perform this action.');
      return;
    }
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.getDepartments();
    });
  }
}