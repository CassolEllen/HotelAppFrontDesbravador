import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

interface DadosResponseDto {
  respostaId: string;
  texto?: string;
  nota?: number | null;
  opcaoSelecionada?: string | null;
  multiplasOpcoesSelecionadas?: string[] | null;

  perguntaId: string;
  pergunta: string;
  tipo: TipoPergunta;
  opcoes?: string[] | null;
  notaMin?: number | null;
  notaMax?: number | null;

  hospedeId: string;
  nomeHospede: string;
  quarto: string;
}

interface PerguntaResumo {
  perguntaId: string;
  pergunta: string;
  tipo: TipoPergunta;
  notaMin?: number | null;
  notaMax?: number | null;

  totalRespostas: number;
  notaMedia?: number | null;

  distribuicaoOpcoes?: { [opcao: string]: number };
  exemplosTexto?: string[];
}


@Component({
  selector: 'app-relatorio-questionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorio-questionario.html',
  styleUrls: ['./relatorio-questionario.css']
})
export class RelatorioQuestionarioComponent implements OnInit {

  TipoPergunta = TipoPergunta;
  objectKeys = Object.keys;

  carregando = true;

  respostas: DadosResponseDto[] = [];
  resumoPerguntas: PerguntaResumo[] = [];

  
  filtroQuarto: string = '';
  filtroHospede: string = '';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.carregando = true;

    
    this.http
      .post<DadosResponseDto[]>(`${environment.apiUrl}/DadosFormulario/PegarDados`, {})
      .subscribe({
        next: (res) => {
          this.respostas = res;
          this.calcularResumo();
          this.carregando = false;
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao carregar dados de respostas.');
          this.carregando = false;
        }
      });
  }

  private calcularResumo() {
    
    const filtradas = this.respostas.filter(r => {
      let ok = true;

      if (this.filtroQuarto) {
        ok = ok && r.quarto?.toLowerCase().includes(this.filtroQuarto.toLowerCase());
      }

      if (this.filtroHospede) {
        ok = ok && r.nomeHospede?.toLowerCase().includes(this.filtroHospede.toLowerCase());
      }

      return ok;
    });

    type Interno = {
      perguntaId: string;
      pergunta: string;
      tipo: TipoPergunta;
      notaMin?: number | null;
      notaMax?: number | null;
      totalRespostas: number;
      somaNotas: number;
      qtdNotas: number;
      distribuicaoOpcoes: { [opcao: string]: number };
      exemplosTexto: string[];
    };

    const mapa = new Map<string, Interno>();

    for (const r of filtradas) {
      let item = mapa.get(r.perguntaId);

      if (!item) {
        item = {
          perguntaId: r.perguntaId,
          pergunta: r.pergunta,
          tipo: r.tipo,
          notaMin: r.notaMin,
          notaMax: r.notaMax,
          totalRespostas: 0,
          somaNotas: 0,
          qtdNotas: 0,
          distribuicaoOpcoes: {},
          exemplosTexto: []
        };

        
        if (r.opcoes) {
          for (const opc of r.opcoes) {
            item.distribuicaoOpcoes[opc] = 0;
          }
        }

        mapa.set(r.perguntaId, item);
      }

      item.totalRespostas++;

      
      if (r.tipo === TipoPergunta.Nota && r.nota != null) {
        item.somaNotas += r.nota;
        item.qtdNotas++;
      }

      
      if (
        r.tipo === TipoPergunta.UnicaEscolha ||
        r.tipo === TipoPergunta.MultiplaEscolha ||
        r.tipo === TipoPergunta.Checkbox
      ) {
        if (r.opcaoSelecionada) {
          if (!item.distribuicaoOpcoes[r.opcaoSelecionada]) {
            item.distribuicaoOpcoes[r.opcaoSelecionada] = 0;
          }
          item.distribuicaoOpcoes[r.opcaoSelecionada]++;
        }

        if (r.multiplasOpcoesSelecionadas) {
          for (const op of r.multiplasOpcoesSelecionadas) {
            if (!item.distribuicaoOpcoes[op]) {
              item.distribuicaoOpcoes[op] = 0;
            }
            item.distribuicaoOpcoes[op]++;
          }
        }
      }

      
      if (
        (r.tipo === TipoPergunta.Texto || r.tipo === TipoPergunta.Data) &&
        r.texto &&
        item.exemplosTexto.length < 10
      ) {
        item.exemplosTexto.push(r.texto);
      }
    }

    this.resumoPerguntas = Array.from(mapa.values()).map(x => ({
      perguntaId: x.perguntaId,
      pergunta: x.pergunta,
      tipo: x.tipo,
      notaMin: x.notaMin,
      notaMax: x.notaMax,
      totalRespostas: x.totalRespostas,
      notaMedia: x.qtdNotas > 0 ? x.somaNotas / x.qtdNotas : null,
      distribuicaoOpcoes: x.distribuicaoOpcoes,
      exemplosTexto: x.exemplosTexto
    }));
  }

  aplicarFiltros() {
    this.calcularResumo();
  }

  

  get totalPerguntas(): number {
    return this.resumoPerguntas.length;
  }

  get totalRespostas(): number {
    return this.respostas.length;
  }

  get totalHospedesRespondentes(): number {
    const ids = this.respostas.map(r => r.hospedeId);
    return new Set(ids).size;
  }

  get notaMediaGeral(): number | null {
    const notas = this.respostas
      .filter(r => r.tipo === TipoPergunta.Nota && r.nota != null)
      .map(r => r.nota as number);

    if (!notas.length) {
      return null;
    }

    const soma = notas.reduce((acc, n) => acc + n, 0);
    return soma / notas.length;
  }
}
