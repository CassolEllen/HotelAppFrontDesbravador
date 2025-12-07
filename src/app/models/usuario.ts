export interface Usuario {
  id?: string;
  nome: string;
  email?: string; // opcional
  contato?: {
    email?: string; // opcional
  };
  papel: string;
  hotelId?: string; // opcional → evita erro TS
}
