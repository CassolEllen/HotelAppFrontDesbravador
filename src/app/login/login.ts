import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  email = ''; 
  password = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
  this.authService.login(this.email, this.password).subscribe({
    next: (token) => {
      localStorage.setItem('token', token); 
      this.errorMessage = null;
      this.router.navigate(['/hoteis']);
    },
    error: () => {
      this.errorMessage = 'Usuário ou senha incorretos';
    }
  });
}}
