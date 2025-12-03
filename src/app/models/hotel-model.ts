export interface Hotel {
  id?: string;
  nome: string;
  endereco: string;
  contato: {
    email: string;
    whatsapp: string;
  };
  configuracaoHotel: {
    idioma: string;
  };
    questionarioSelecionadoId?: string | null;
}
