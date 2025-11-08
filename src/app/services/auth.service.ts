import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5119/api/Auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const body = { username, password }; 
    return this.http.post(`${this.apiUrl}/Login`, body, { responseType: 'text' });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
