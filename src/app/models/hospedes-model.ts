export interface ConfiguracaoDTo {
    idioma: string;
  }
  
  export interface ContatoDTo {
    email: string;
    whatsapp: string;
  }
  
  export interface HospedeDTo {
    nome: string;
    quarto: string;
    configuracaoHospede: ConfiguracaoDTo;
    contato: ContatoDTo;
  }
  
  export interface HospedeResponseDTo {
    id: string;
    nomeHotel: string;
    nome: string;
    quarto: string;
    idioma: string;
    email: string;
    whatsapp: string;
  }