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

  private apiUrl = `${environment.apiUrl}/Hotel/BuscarHoteis`;


  constructor(private http: HttpClient) { }

  getHoteis(): Observable<Hotel[]> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzU3Nzg4NTI4LCJleHAiOjE3NTc3OTU3MjgsImlhdCI6MTc1Nzc4ODUyOCwiaXNzIjoiTWluaGFBUEkiLCJhdWQiOiJNZXVzQ2xpZW50ZXMifQ.so_9YJWQP3GwUZf6Wk7dGF56oxq71-8kCrSXNr64Hgk';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Hotel[]>(this.apiUrl, { headers });
  }
}
