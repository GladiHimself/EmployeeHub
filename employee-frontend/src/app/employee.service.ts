import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

export interface PageResponse {
  content: Employee[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "https://employeehub-production.up.railway.app/api/v1/employees";

  constructor(private httpClient: HttpClient) { }

  getEmployeeList(page: number = 0, size: number = 5): Observable<PageResponse> {
    return this.httpClient.get<PageResponse>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  searchEmployees(keyword: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }

  createEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

}
