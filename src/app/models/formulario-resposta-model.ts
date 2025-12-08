export interface DadosRespostaDTo {
    // Estas propriedades devem corresponder ao seu DadosRespostaDTo no C#
    Texto?: string | null;
    Nota?: number | null;
    OpcaoSelecionada?: string | null;
    MultiplasOpcoesSelecionadas?: string[] | null;
    PerguntaId: string; // GUID da Pergunta
    HospedeId: string;  // GUID do Hóspede que respondeu
}

export interface DadosFormularioDto {
    QuestionarioId: string; // GUID do Questionário
    HospedeId: string;      // GUID do Hóspede (redundante, mas usado para agrupamento)
    Respostas: DadosRespostaDTo[];
}