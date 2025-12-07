import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment'; 

@Component({
  selector: 'app-envio-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envio-formulario.html',
  styleUrls: ['./envio-formulario.css']
})
export class EnvioFormularioComponent implements OnInit {

  questionarioId!: string;
  hospedeId!: string;

  questionario: any;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.questionarioId = this.route.snapshot.queryParamMap.get('questionario')!;
    this.hospedeId = this.route.snapshot.queryParamMap.get('hospede')!;

    this.carregarQuestionario();
  }

 carregarQuestionario() {
  if (!this.questionarioId) {
    this.carregando = false;
      return;
      }

    this.http
      .get(`${environment.apiUrl}/Questionario/BuscarQuestionarioPorId/${this.questionarioId}`)
      .subscribe({
        next: (res) => {
          this.questionario = res;
          this.carregando = false;
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao carregar o questionário');
          this.carregando = false;
        }
      });
  }

  enviar() {
    const payload = {
      questionarioId: this.questionarioId,
      respostas: this.questionario.perguntas.map((p: any) => ({
        texto: p.respostaTexto ?? "",
        nota: p.respostaNota ?? 0,
        opcaoSelecionada: p.opcaoSelecionada ?? "",
        multiplasOpcoesSelecionadas: [],
        perguntaId: p.id,
        hospedeId: this.hospedeId
      }))
    };

    // 3. USANDO VARIÁVEL DE AMBIENTE PARA O ENVIO:
    this.http
      .post(`${environment.apiUrl}/DadosFormulario/EnvioFormulario`, payload)
      .subscribe({
        next: () => {
          alert('Avaliação enviada com sucesso! Obrigado 😊');
        },
        error: () => {
          alert('Erro ao enviar o formulário.');
        }
      });
  }
}