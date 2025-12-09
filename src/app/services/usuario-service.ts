import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:7092/api/Usuario';

  constructor(private http: HttpClient) { }

  
  buscarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/BuscarUsuarios`);
  }

  
  buscarUsuarioPorId(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/BuscarUsuarioPorId/${id}`, {});
  }

  
  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CriarUsuario`, usuario);
  }

  
  atualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/AtualizarUsuario/${id}`, usuario);
  }

  
  deletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeletarUsuario/${id}`);
  }
}
