import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-form.html',
  styleUrls: ['./usuario-form.css']
})
export class UsuarioForm {
  usuario = {
    nome: '',
    contato: {
      email: '',
      whatsapp: ''
    },
    senha: '',
    papel: 'Funcionario', 
    tipoUsuario: 'Funcionario',
  };

  constructor(private http: HttpClient, private router: Router) {}

  salvar() {
    console.log('Enviando para API:', this.usuario); 

    this.http.post(`${environment.apiUrl}/Usuario/CriarUsuario`, this.usuario).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Erro ao salvar usuário:', err);
        alert('Erro ao cadastrar usuário. Verifique os dados.');
      }
    });
  }
}
