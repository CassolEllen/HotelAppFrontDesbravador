import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment';

enum TipoPergunta {
  Texto = 1,
  MultiplaEscolha = 2, 
  Nota = 3,
  UnicaEscolha = 4, 
  Checkbox = 5, 
  Data = 6
}

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

  TipoPergunta = TipoPergunta;

  questionario: any = { perguntas: [] }; 
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
        next: (res: any) => {
          this.questionario = res;
          
          if (!this.questionario.perguntas) {
              this.questionario.perguntas = [];
          }
          
          
          this.questionario.perguntas.forEach((p: any) => {
              
            
            if (p.tipo === TipoPergunta.Texto || p.tipo === TipoPergunta.Data) {
                p.respostaTexto = p.respostaTexto ?? ''; 
            } else if (p.tipo === TipoPergunta.Nota) {
                p.respostaNota = p.respostaNota ?? null; 
            } else if (p.tipo === TipoPergunta.UnicaEscolha) {
                p.opcaoSelecionada = p.opcaoSelecionada ?? null; 
            }
            
            
            if (p.tipo === TipoPergunta.MultiplaEscolha || p.tipo === TipoPergunta.Checkbox) {
                p.multiplasOpcoesSelecionadas = p.multiplasOpcoesSelecionadas ?? [];
            }
          });
          
          this.carregando = false;
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao carregar o questionário');
          this.carregando = false;
        }
      });
  }

 
  toggleOpcao(pergunta: any, opcao: string, isChecked: boolean) {
    if (!pergunta.multiplasOpcoesSelecionadas) {
        pergunta.multiplasOpcoesSelecionadas = [];
    }
    
    const index = pergunta.multiplasOpcoesSelecionadas.indexOf(opcao);

    if (isChecked) {
        if (index === -1) {
            pergunta.multiplasOpcoesSelecionadas.push(opcao);
        }
    } else {
        if (index !== -1) {
            pergunta.multiplasOpcoesSelecionadas.splice(index, 1);
        }
    }
  }

 
  enviar() {
    if (!this.questionario || !this.questionario.perguntas) {
        alert('Nenhum questionário para enviar.');
        return;
    }

    
    let todasRespondidas = true;
    for (const p of this.questionario.perguntas) {
        if (p.tipo === this.TipoPergunta.Texto || p.tipo === this.TipoPergunta.Data) {
            
            if (!p.respostaTexto || String(p.respostaTexto).trim() === '') {
                todasRespondidas = false;
                break;
            }
        } else if (p.tipo === this.TipoPergunta.Nota) {
           
            if (p.respostaNota === null || p.respostaNota === undefined || String(p.respostaNota).trim() === '') {
                todasRespondidas = false;
                break;
            }
        } else if (p.tipo === this.TipoPergunta.UnicaEscolha) {
            
            if (p.opcaoSelecionada === null || p.opcaoSelecionada === undefined) {
                todasRespondidas = false;
                break;
            }
        } else if (p.tipo === this.TipoPergunta.MultiplaEscolha || p.tipo === this.TipoPergunta.Checkbox) {
           
            if (!p.multiplasOpcoesSelecionadas || p.multiplasOpcoesSelecionadas.length === 0) {
                todasRespondidas = false;
                break;
            }
        }
    }

    if (!todasRespondidas) {
        alert('🛑 Por favor, preencha todas as perguntas obrigatórias.');
        return;
    }
    
    const payload = {
      questionarioId: this.questionarioId,
      respostas: this.questionario.perguntas.map((p: any) => {
          
          const resposta: any = {
              perguntaId: p.id,
              hospedeId: this.hospedeId
          };
          
          switch (p.tipo) {
              case this.TipoPergunta.Texto:
              case this.TipoPergunta.Data:
                  resposta.texto = p.respostaTexto ?? null;
                  break;
              case this.TipoPergunta.Nota:
                  resposta.nota = p.respostaNota ? Number(p.respostaNota) : null; 
                  break;
              case this.TipoPergunta.UnicaEscolha:
                  resposta.opcaoSelecionada = p.opcaoSelecionada ?? null;
                  break;
              case this.TipoPergunta.MultiplaEscolha:
              case this.TipoPergunta.Checkbox:
                  resposta.multiplasOpcoesSelecionadas = p.multiplasOpcoesSelecionadas ?? [];
                  break;
              default:
                  break;
          }
          
          return resposta;
      })
    };

console.log("Payload de envio:", payload);

this.http
    .post(`${environment.apiUrl}/DadosFormulario/EnvioFormulario`, payload)
    .subscribe({
        next: () => {
            
            alert('Avaliação enviada com sucesso! Obrigado 😊');

          
            const tempoParaFecharMs = 3000; 
            
            setTimeout(() => {
                
                window.close();
            }, tempoParaFecharMs);
            
        },
        error: (err) => {
            console.error("Erro no envio:", err);
            alert('Erro ao enviar o formulário. Por favor, tente novamente.');
        }
    });
  }
}