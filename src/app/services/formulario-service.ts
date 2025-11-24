import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormularioService {

  private apiUrl = 'https://localhost:7092/api/Questionario';

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/BuscarQuestionarios`);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/BuscarQuestionarioPorId/${id}`, {});
  }

  criar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CriarQuestionario`, data);
  }

  atualizar(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/AtualizarQuestionario/${id}`, data);
  }

  deletar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeletarQuestionario/${id}`);
  }
}
