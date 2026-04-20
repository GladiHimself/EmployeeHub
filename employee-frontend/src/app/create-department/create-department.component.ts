import { Component } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent {

  department: Department = new Department();

  constructor(private departmentService: DepartmentService, private router: Router) { }

  saveDepartment() {
    this.departmentService.createDepartment(this.department).subscribe(data => {
      this.router.navigate(['/departments']);
    });
  }

  cancel() {
    this.router.navigate(['/departments']);
  }

}
