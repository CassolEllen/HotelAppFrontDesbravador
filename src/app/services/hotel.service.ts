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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzU3Nzk0NDMyLCJleHAiOjE3NTc4MDE2MzIsImlhdCI6MTc1Nzc5NDQzMiwiaXNzIjoiTWluaGFBUEkiLCJhdWQiOiJNZXVzQ2xpZW50ZXMifQ.XAIHkcb-HSBVcpQqGuOYgA0mSC6Fk_YnTXbZ444FJEE';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Hotel[]>(this.apiUrl, { headers });
  }
}
