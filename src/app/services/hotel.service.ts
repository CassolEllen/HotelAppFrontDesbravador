import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = 'https://localhost:7092/api/Hotel';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getHoteis(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/BuscarHoteis`, { headers });
  }

  getHotelById(id: string): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.post(`${this.apiUrl}/BuscarHotelPorId/${id}`, {}, { headers });
}


  createHotel(hotel: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/CriarHotel`, hotel, { headers });
  }

  updateHotel(id: string, hotel: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/AtualizarHotel/${id}`, hotel, { headers });
  }

  deleteHotel(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/DeletarHotel/${id}`, { headers });
  }
}
