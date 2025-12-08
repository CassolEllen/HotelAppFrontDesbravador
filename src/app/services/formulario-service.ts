import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionarioDto } from '../models/questionario-model';
import { DadosFormularioDto } from '../models/formulario-resposta-model'; // Importe o DTO
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FormularioService {

  private apiUrl = `${environment.apiUrl}/Questionario`;
  // Assumindo que seu controller de salvamento está em 'Respostas' ou usa a rota base do Questionario
  private respostasApiUrl = `${environment.apiUrl}/Respostas`; // Exemplo: Se tiver um RespostasController

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

  // 🚀 NOVO MÉTODO PARA SALVAR RESPOSTAS
  salvarRespostas(payload: DadosFormularioDto): Observable<any> {
    // Use o endpoint que corresponde à ação de salvar respostas no seu backend.
    // Exemplo: POST para '/api/Respostas/Salvar' ou '/api/Questionario/SalvarRespostas'
    
    // Vou usar a rota base do Questionario por enquanto, como se a ação estivesse lá:
    return this.http.post(`${this.apiUrl}/SalvarRespostas`, payload);
  }
}