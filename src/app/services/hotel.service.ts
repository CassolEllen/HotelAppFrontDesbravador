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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzU3NzM4NDU2LCJleHAiOjE3NTc3NDU2NTYsImlhdCI6MTc1NzczODQ1NiwiaXNzIjoiTWluaGFBUEkiLCJhdWQiOiJNZXVzQ2xpZW50ZXMifQ.Nm9CxpSX6CKEBXZCga_hZt8iOyd8rqPlmbq31OLjThM';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Hotel[]>(this.apiUrl, { headers });
  }
}
