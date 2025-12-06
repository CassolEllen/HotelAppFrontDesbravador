import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioService } from '../services/formulario-service';

@Component({
  selector: 'app-formularios-edit',
  standalone: true,
  templateUrl: './formularios-edit.html',
  styleUrls: ['./formularios-edit.css'],
  imports: [CommonModule, FormsModule]
})
export class FormulariosEditComponent {

  id!: string;
  carregando = true;

  titulo: string = '';
  hotelId: string = '';
  perguntas: any[] = [];

  erro: string | null = null;
  sucesso: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FormularioService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.service.buscarPorId(this.id).subscribe({
      next: (data) => {
        this.titulo = data.titulo;
        this.hotelId = data.hotelId;
        this.perguntas = data.perguntas || [];
        this.carregando = false;
      },
      error: () => {
        this.erro = "Erro ao carregar formulário.";
        this.carregando = false;
      }
    });
  }

  adicionarPergunta() {
    this.perguntas.push({
      texto: "",
      tipo: "texto",
      opcoes: []
    });
  }

  removerPergunta(i: number) {
    this.perguntas.splice(i, 1);
  }

  adicionarOpcao(i: number) {
    this.perguntas[i].opcoes.push("");
  }

  removerOpcao(i: number, j: number) {
    this.perguntas[i].opcoes.splice(j, 1);
  }

  salvar() {
    const payload = {
      id: this.id,
      titulo: this.titulo,
      hotelId: this.hotelId,
      perguntas: this.perguntas
    };

    this.service.atualizar(this.id, payload).subscribe({
      next: () => {
        this.sucesso = "Formulário atualizado com sucesso!";
        setTimeout(() => this.router.navigate(['/formularios']), 1200);
      },
      error: () => {
        this.erro = "Erro ao atualizar formulário.";
      }
    });
  }
}
