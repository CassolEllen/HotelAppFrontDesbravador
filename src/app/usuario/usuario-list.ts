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
  carregando = true;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.buscarUsuarios().subscribe({
      next: (dados: any) => {
        this.usuarios = dados;
        this.carregando = false;
      },
      error: () => {
        alert('Erro ao carregar usuários.');
        this.carregando = false;
      }
    });
  }

  novoUsuario() {
    this.router.navigate(['/usuarios/novo']);
  }

  editarUsuario(id: string) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  deleteUsuario(id: string) {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

  this.usuarioService.deletarUsuario(id).subscribe({
    next: () => {
      alert('Usuário excluído com sucesso!');
      this.carregarUsuarios();
    },
    error: () => alert('Erro ao excluir usuário.')
  });
}
}