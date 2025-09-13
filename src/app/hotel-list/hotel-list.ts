import { Component, OnInit } from '@angular/core';
import { HotelService, Hotel } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
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
