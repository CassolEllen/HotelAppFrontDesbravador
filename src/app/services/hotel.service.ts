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

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = `${environment.apiUrl}/Hotel`;

  constructor(private http: HttpClient) { }

  
  getHoteis(): Observable<Hotel[]> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzU4NjYxMzU3LCJleHAiOjE3NTg2Njg1NTcsImlhdCI6MTc1ODY2MTM1NywiaXNzIjoiTWluaGFBUEkiLCJhdWQiOiJNZXVzQ2xpZW50ZXMifQ.h1AaCYDPQXlwaPZghQoHM-GuSjIlcuyezgGKtMkGN6U';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Hotel[]>(`${this.apiUrl}/BuscarHoteis`, { headers });
  }

 
  createHotel(hotel: Omit<Hotel, 'id'>): Observable<Hotel> {
    const token = 'SEU_TOKEN_AQUI';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Hotel>(`${this.apiUrl}/CriarHotel`, hotel, { headers });
  }
}
