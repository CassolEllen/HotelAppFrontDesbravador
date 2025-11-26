import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HospedeDTo, HospedeResponseDTo } from '../models/hospedes-model';

export interface Contato {
  telefone?: string;
  email?: string;
}

export interface ConfiguracaoHospede {
  receberEmail?: boolean;
  receberSms?: boolean;
}

@Injectable({
    providedIn: 'root'
  })
  export class HospedeService {
  
    private apiUrl = 'https://localhost:7092/api/Hospede';
  
    constructor(private http: HttpClient) {}
  
    criar(hospede: HospedeDTo): Observable<any> {
      return this.http.post(this.apiUrl + '/CriarHospede', hospede);
    }
  
    listar(): Observable<HospedeResponseDTo[]> {
      return this.http.get<HospedeResponseDTo[]>(this.apiUrl + '/BuscarHospedes');
    }
  
    buscarPorId(id: string): Observable<HospedeDTo> {
      return this.http.get<HospedeDTo>(`${this.apiUrl}/BuscarHospedesPorId/${id}`);
    }
  
    atualizar(id: string, hospede: HospedeDTo): Observable<HospedeResponseDTo> {
      return this.http.put<HospedeResponseDTo>(`${this.apiUrl}/AtualizarHospede/${id}`, hospede);
    }
  
    remover(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/DeletarHospede/${id}`);
    }
  }
  
