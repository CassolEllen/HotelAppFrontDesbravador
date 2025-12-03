import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/Usuario`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/BuscarUsuarios`);
  }

  getUsuarioById(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/BuscarUsuarioPorId?id=${id}`, {});
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CriarUsuario`, usuario);
  }

  updateUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/AtualizarUsuario/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeletarUsuario/${id}`);
  }
}
