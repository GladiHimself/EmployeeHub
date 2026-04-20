import { Observable } from "rxjs";
import { Department } from "./department";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

    private baseUrl = 'http://localhost:8080/api/v1/departments';

    constructor(private http: HttpClient) { }

    getDepartmentList(): Observable<Department[]> {
        return this.http.get<Department[]>(`${this.baseUrl}`);
    }

    getDepartmentById(id: number): Observable<Department> {
        return this.http.get<Department>(`${this.baseUrl}/${id}`);
    }

    createDepartment(department: Department): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, department);
    }

    updateDepartment(id: number, department: Department): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, department);
    }

    deleteDepartment(id: number): Observable<Object> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}