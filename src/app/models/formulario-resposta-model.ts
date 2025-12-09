export interface DadosRespostaDTo {
    
    Texto?: string | null;
    Nota?: number | null;
    OpcaoSelecionada?: string | null;
    MultiplasOpcoesSelecionadas?: string[] | null;
    PerguntaId: string; 
    HospedeId: string;  
}

export interface DadosFormularioDto {
    QuestionarioId: string; 
    HospedeId: string;      
    Respostas: DadosRespostaDTo[];
}