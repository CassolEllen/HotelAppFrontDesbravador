import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:7092/api/Usuario';

  constructor(private http: HttpClient) { }

  // GET - Buscar todos
  buscarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/BuscarUsuarios`);
  }

  // POST - Buscar por ID
  buscarUsuarioPorId(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/BuscarUsuarioPorId/${id}`, {});
  }

  // POST - Criar
  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CriarUsuario`, usuario);
  }

  // PUT - Atualizar
  atualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/AtualizarUsuario/${id}`, usuario);
  }

  // DELETE - Deletar
  deletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeletarUsuario/${id}`);
  }
}
