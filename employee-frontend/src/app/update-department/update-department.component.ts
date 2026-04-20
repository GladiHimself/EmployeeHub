import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  department: Department = new Department();
  id: number;
  
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.departmentService.getDepartmentById(this.id).subscribe(data => {
      this.department = data;
    });
  }

  updateDepartment() {
    this.departmentService.updateDepartment(this.id, this.department).subscribe(data => {
      this.router.navigate(['/departments']);
    });
  }

  cancel() {
    this.router.navigate(['/departments']);
  }

}
