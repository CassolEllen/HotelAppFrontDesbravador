export interface Contato {
  id?: string;
  nome?: string;
  telefone?: string;
  email?: string;
  whatsapp?: string;
}

export interface ConfiguracaoHotel {
  quantidadeQuartos?: number;
  quantidadeAndares?: number;
  possuiPiscina?: boolean;
  id?: string;
}

export interface Hotel {
  id?: string;
  nome?: string;
  endereco?: string;
  contato?: Contato | null;
  configuracaoHotel?: ConfiguracaoHotel | null;
}
