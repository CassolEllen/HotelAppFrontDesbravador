import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment';

// Definição dos Enums para mapear o tipo de pergunta do Backend (C# ou DB)
enum TipoPergunta {
  Texto = 1,
  MultiplaEscolha = 2, // Usado para Checkboxes (múltiplas respostas)
  Nota = 3,
  UnicaEscolha = 4, // Usado para Radio Buttons ou Select (uma resposta)
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

  // Expor o Enum para uso no template HTML (necessário para o *ngSwitch)
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
          
          // 💡 INICIALIZAÇÃO CRUCIAL:
          // Adiciona as propriedades de resposta aos objetos de pergunta para o two-way binding (ngModel)
          this.questionario.perguntas.forEach((p: any) => {
              
            // Inicializa a resposta para tipos de texto/data/nota/unica (valores primitivos)
            if (p.tipo === TipoPergunta.Texto || p.tipo === TipoPergunta.Data) {
                p.respostaTexto = p.respostaTexto ?? ''; // Garante string vazia para ngModel
            } else if (p.tipo === TipoPergunta.Nota) {
                p.respostaNota = p.respostaNota ?? null; // Garante null para ngModel de número
            } else if (p.tipo === TipoPergunta.UnicaEscolha) {
                p.opcaoSelecionada = p.opcaoSelecionada ?? null; // Garante null para ngModel
            }
            
            // Inicializa o array para seleção múltipla
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

  /**
   * Gerencia a adição/remoção de opções em perguntas de Múltipla Escolha (Checkbox).
   */
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

  /**
   * Prepara o payload de envio, mapeando as respostas E VALIDANDO os campos obrigatórios.
   */
  enviar() {
    if (!this.questionario || !this.questionario.perguntas) {
        alert('Nenhum questionário para enviar.');
        return;
    }

    // 1. VALIDAÇÃO DE CAMPOS OBRIGATÓRIOS
    let todasRespondidas = true;
    for (const p of this.questionario.perguntas) {
        if (p.tipo === this.TipoPergunta.Texto || p.tipo === this.TipoPergunta.Data) {
            // Valida Textarea ou Input Date: deve ter conteúdo
            if (!p.respostaTexto || String(p.respostaTexto).trim() === '') {
                todasRespondidas = false;
                break;
            }
        } else if (p.tipo === this.TipoPergunta.Nota) {
            // Valida Nota: deve ser um número não nulo/vazio
            if (p.respostaNota === null || p.respostaNota === undefined || String(p.respostaNota).trim() === '') {
                todasRespondidas = false;
                break;
            }
        } else if (p.tipo === this.TipoPergunta.UnicaEscolha) {
            // Valida Escolha Única: deve ter uma opção selecionada
            if (p.opcaoSelecionada === null || p.opcaoSelecionada === undefined) {
                todasRespondidas = false;
                break;
            }
        } else if (p.tipo === this.TipoPergunta.MultiplaEscolha || p.tipo === this.TipoPergunta.Checkbox) {
            // Valida Múltipla Escolha: o array de seleção não pode estar vazio
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
    
    // 2. MONTAGEM DO PAYLOAD
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
                  // Converte para Number, garantindo que o backend receba o tipo correto
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

    // 3. ENVIO DA REQUISIÇÃO HTTP
    console.log("Payload de envio:", payload); 

    this.http
      .post(`${environment.apiUrl}/DadosFormulario/EnvioFormulario`, payload)
      .subscribe({
        next: () => {
          alert('Avaliação enviada com sucesso! Obrigado 😊');
          // Lógica de redirecionamento ou sucesso aqui
        },
        error: (err) => {
          console.error("Erro no envio:", err);
          alert('Erro ao enviar o formulário. Por favor, tente novamente.');
        }
      });
  }
}