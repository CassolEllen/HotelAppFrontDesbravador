import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Hotel {
  id: string;
  nome: string;
  endereco: string;
  contatoId: string;
  configuracaoHotelId: string;
  contato: { email: string; whatsapp: string; id: string } | null;
  configuracaoHotel: { idioma: string; id: string } | null;
}

export interface CreateHotelDTO {
  nome: string;
  endereco: string;
  contato: {
    telefone: string;
    whatsapp: string;
    email: string;
  };
  configuracaoHotel: {
    quantidadeQuartos: number;
    quantidadeAndares: number;
    possuiPiscina: boolean;
  };
}


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = `${environment.apiUrl}/Hotel`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getHoteis(): Observable<Hotel[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Hotel[]>(`${this.apiUrl}/BuscarHoteis`, { headers });
  }

  createHotel(hotel: CreateHotelDTO): Observable<Hotel> {
    const headers = this.getAuthHeaders();
    return this.http.post<Hotel>(`${this.apiUrl}/CriarHotel`, hotel, { headers });
  }
}
