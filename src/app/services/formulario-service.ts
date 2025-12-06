import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionarioDto } from '../models/questionario-model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FormularioService {

  private apiUrl = `${environment.apiUrl}/Questionario`;

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/BuscarQuestionarios`);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/BuscarQuestionarioPorId/${id}`, {});
  }

  criarQuestionario(payload: QuestionarioDto) {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/CriarQuestionario`, payload, { headers });
  }

  atualizar(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/AtualizarQuestionario/${id}`, data);
  }

  deletar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeletarQuestionario/${id}`);
  }
}
