export interface QuestionarioDto {
    titulo: string;
    perguntas: PerguntaDto[];
  }
  
  export interface PerguntaDto {
    descricao?: string;
    tipoPergunta: number;
    opcoes?: string[];
    notaMin?: number;
    notaMax?: number;
  }
  