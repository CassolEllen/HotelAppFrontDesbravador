import { Component } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-list',
  standalone: true,       
  imports: [CommonModule, RouterModule], 
  templateUrl: './hotel-list.html',
  styleUrls: ['./hotel-list.css']
})
export class HotelListComponent {
  hoteis: any[] = [];
  erro: string | null = null;

  constructor(private hotelService: HotelService) {
    this.carregarHoteis();
  }

  carregarHoteis() {
    this.hotelService.getHoteis().subscribe({
      next: (data) => this.hoteis = data,
      error: (err) => this.erro = 'Erro ao carregar hotéis'
    });
  }
}
