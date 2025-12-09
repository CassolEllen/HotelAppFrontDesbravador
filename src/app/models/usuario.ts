export interface Usuario {
  id?: string;
  nome: string;
  email?: string; 
  contato?: {
    email?: string; 
  };
  papel: string;
  hotelId?: string; 
}
