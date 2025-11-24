import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-5">
      <h2 class="mb-4">Lista de Usuários</h2>

      <button class="btn btn-primary mb-3" (click)="criarUsuario()">+ Novo Usuário</button>

      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let usuario of usuarios">
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.cargo }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarUsuario(usuario)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="deletarUsuario(usuario.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class UsuarioList implements OnInit {
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router) {} 

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.http.get('https://localhost:7092/api/Usuario/BuscarUsuarios').subscribe({
      next: (dados: any) => (this.usuarios = dados),
      error: (err) => console.error('Erro ao carregar usuários:', err),
    });
  }

  criarUsuario() {
    this.router.navigate(['/usuarios/novo']); 
  }

  editarUsuario(usuario: any) {
    this.router.navigate(['/usuarios/editar', usuario.id]); 
  }

  deletarUsuario(id: string) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.http.delete(`https://localhost:7092/api/Usuario/DeletarUsuario/${id}`).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.carregarUsuarios();
        },
        error: (err) => console.error('Erro ao excluir usuário:', err),
      });
    }
  }
}
