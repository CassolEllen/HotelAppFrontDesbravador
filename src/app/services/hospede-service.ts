// src/app/services/hospede-service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HospedeDTo, HospedeResponseDTo } from '../models/hospedes-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospedeService {
  private apiUrl =  `${environment.apiUrl}/Hospede`;
  private checkoutUrl = `${environment.apiUrl}/Checkout/Checkout`;


  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('authToken'); // ajuste se o token estiver em outro lugar
    const headersObj: Record<string,string> = { 'Content-Type': 'application/json' };
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    return { headers: new HttpHeaders(headersObj) };
  }

  // GET BuscarHospedes
  listar(): Observable<HospedeResponseDTo[]> {
    return this.http.get<HospedeResponseDTo[]>(
      `${this.apiUrl}/BuscarHospedes`,
      this.getAuthHeaders()
    );
  }

  // POST BuscarHospedesPorId/{id}  (backend usa POST)
  buscarPorId(id: string): Observable<HospedeDTo> {
    return this.http.post<HospedeDTo>(
      `${this.apiUrl}/BuscarHospedesPorId/${id}`,
      {}, // body vazio conforme seu controller
      this.getAuthHeaders()
    );
  }

  // POST CriarHospede
  criar(hospede: HospedeDTo): Observable<HospedeResponseDTo> {
    return this.http.post<HospedeResponseDTo>(
      `${this.apiUrl}/CriarHospede`,
      hospede,
      this.getAuthHeaders()
    );
  }

  // PUT AtualizarHospede/{id}
  atualizar(id: string, hospede: HospedeDTo): Observable<HospedeResponseDTo> {
    return this.http.put<HospedeResponseDTo>(
      `${this.apiUrl}/AtualizarHospede/${id}`,
      hospede,
      this.getAuthHeaders()
    );
  }

  // DELETE DeletarHospede/{id}
  remover(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/DeletarHospede/${id}`,
      this.getAuthHeaders()
    );
  }

    checkout(hospedeId: string): Observable<any> {
    return this.http.post(this.checkoutUrl, { hospedeId });
  }
}
