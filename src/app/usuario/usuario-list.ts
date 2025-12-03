import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario-service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario-list.html',
  styleUrls: ['./usuario-list.css']
})
export class UsuarioList implements OnInit {

  usuarios: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (dados: any) => {
        console.log("Usuários carregados:", dados);
        this.usuarios = dados;
      },
      error: (err) => console.error('Erro ao carregar usuários:', err),
    });
  }

  novoUsuario() {
    this.router.navigate(['/usuarios/novo']);
  }

  editarUsuario(id: string) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  deleteUsuario(id: string) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.carregarUsuarios();
        },
        error: (err) => console.error('Erro ao excluir usuário:', err),
      });
    }
  }
}
