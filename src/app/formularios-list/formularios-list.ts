import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormularioService } from '../services/formulario-service';

@Component({
  selector: 'app-formularios-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formularios-list.html',
  styleUrls: ['./formularios-list.css']

})
export class FormulariosListComponent {
  formularios: any[] = [];
  carregando = true;

  constructor(
    private FormularioService: FormularioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.FormularioService.listar().subscribe({
      next: (data: any) => {
        this.formularios = data;
        this.carregando = false;
      },
      error: () => {
        alert('Erro ao carregar formulários');
        this.carregando = false;
      }
    });
  }

  novo() {
    this.router.navigate(['/formularios/novo']);
  }

  editar(id: string) {
    this.router.navigate(['/formularios/editar', id]);
  }

  deletar(id: string) {
    if (!confirm('Tem certeza que deseja excluir este formulário?')) return;

    this.FormularioService.deletar(id).subscribe({
      next: () => {
        alert('Formulário deletado!');
        this.formularios = this.formularios.filter(f => f.id !== id);
      },
      error: () => alert('Erro ao deletar formulário')
    });
  }
}
