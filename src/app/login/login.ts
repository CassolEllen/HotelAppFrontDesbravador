import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loading = false;

        if (res && res.bearerToken) {
          
          this.authService.salvarToken(res.bearerToken);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Credenciais inválidas.';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro ao fazer login:', err);
        this.errorMessage = 'Falha no login. Verifique suas credenciais.';
      }
    });
  }
}
