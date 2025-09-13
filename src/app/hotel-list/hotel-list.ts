import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // necessário para *ngIf e *ngFor
import { HttpClientModule } from '@angular/common/http'; // necessário para HttpClient
import { HotelService, Hotel } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  standalone: true, // indica que é standalone
  imports: [CommonModule, HttpClientModule], // adiciona módulos que o componente precisa
  templateUrl: './hotel-list.html',
  styleUrls: ['./hotel-list.css']
})
export class HotelListComponent implements OnInit {
  hoteis: Hotel[] = [];
  erro: string | null = null;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.carregarHoteis();
  }

  carregarHoteis(): void {
    this.hotelService.getHoteis().subscribe({
      next: (dados) => this.hoteis = dados,
      error: (err) => {
        console.error(err);
        this.erro = 'Erro ao carregar hotéis';
      }
    });
  }
}
