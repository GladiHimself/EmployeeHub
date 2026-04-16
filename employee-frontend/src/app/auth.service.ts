import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';
  private loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`,
      { username, password },
      { withCredentials: true }
    ).pipe(
      tap(() => this.loggedIn = true)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.loggedIn = false;
        this.router.navigate(['/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}