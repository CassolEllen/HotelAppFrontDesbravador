import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- CORREÇÃO 1: Para *ngIf e *ngFor
import { FormsModule } from '@angular/forms';   // <-- CORREÇÃO 2: Para [(ngModel)] e ngForm
import { FormularioService } from '../services/formulario-service';
import { DadosFormularioDto, DadosRespostaDTo } from '../models/formulario-resposta-model'; 

@Component({
  selector: 'app-formulario-resposta',
  // ✅ Inclua CommonModule e FormsModule no array de imports:
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './formulario-resposta.html',
  styleUrls: ['./formulario-resposta.css'] // (Assumindo que você tem este arquivo CSS)
})
export class FormularioRespostaComponent implements OnInit {

  questionario: any; 
  // Nota: Ajuste este ID do hóspede para o seu método real de obtenção de ID de usuário/sessão.
  hospedeId: string = 'Algum-ID-Fixo-Ou-Vindo-Da-Sessão'; 
  loading = true;

  dadosFormulario: DadosFormularioDto = {
    QuestionarioId: '',
    HospedeId: this.hospedeId,
    Respostas: []
  };

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService
  ) {}

  ngOnInit() {
    const questionarioId = this.route.snapshot.paramMap.get('id');

    if (questionarioId) {
      this.dadosFormulario.QuestionarioId = questionarioId;
      this.carregarQuestionario(questionarioId);
    } else {
      console.error('ID do questionário não encontrado.');
      this.loading = false;
    }
  }

  carregarQuestionario(id: string) {
    this.formularioService.buscarPorId(id).subscribe({
      next: (res) => {
        this.questionario = res;
        this.inicializarRespostas(this.hospedeId);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar questionário:', err);
        this.loading = false;
      }
    });
  }

  inicializarRespostas(hospedeId: string) {
    if (this.questionario && this.questionario.perguntas) {
      this.dadosFormulario.Respostas = this.questionario.perguntas.map((p: any) => ({
        PerguntaId: p.id,
        HospedeId: hospedeId,
        Texto: null,
        Nota: null,
        OpcaoSelecionada: null,
        MultiplasOpcoesSelecionadas: null
      }) as DadosRespostaDTo);
    }
  }
  
  enviarRespostas() {
    this.formularioService.salvarRespostas(this.dadosFormulario).subscribe({
      next: () => {
        alert('Obrigado! Suas respostas foram salvas.');
      },
      error: (err) => {
        console.error('Erro ao salvar respostas:', err);
        alert('Não foi possível salvar as respostas. Tente novamente.');
      }
    });
  }
}