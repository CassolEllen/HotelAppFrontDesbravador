import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = `${environment.apiUrl}/Hotel`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // LISTAR
  getHoteis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/BuscarHoteis`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      map(hoteis => hoteis.map(h => this.mapResponse(h)))
    );
  }

  // BUSCAR POR ID
  getHotelById(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/BuscarHotelPorId/${id}`, {}, {
      headers: this.getAuthHeaders(),
    }).pipe(
      map(hotel => this.mapResponse(hotel))
    );
  }

  // CREATE
  createHotel(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CriarHotel`, dto, {
      headers: this.getAuthHeaders(),
    });
  }

  // UPDATE
  updateHotel(id: string, hotel: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/AtualizarHotel/${id}`, hotel, {
      headers: this.getAuthHeaders(),
    });
  }

  // DELETE
  deleteHotel(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeletarHotel/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // MAPEAMENTO DA API → ANGULAR
  private mapResponse(h: any) {
    return {
      id: h.id,
      nome: h.nome,
      endereco: h.endereco,
      contato: {
        email: h.contato?.email ?? h.email,
        whatsapp: h.contato?.whatsapp ?? h.whatsapp,
      },
      configuracaoHotel: {
        idioma: h.configuracaoHotel?.idioma ?? h.idioma ?? 'pt-BR',
      },
      questionarioSelecionadoId: h.questionarioSelecionadoId ?? null,
    };
  }
}
