import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel-model';

@Component({
  selector: 'app-hotel-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-edit.html',
  styleUrls: ['./hotel-edit.css']
})
export class HotelEditComponent {
  hotel: Hotel = {
    id: '',
    nome: '',
    endereco: '',
    email: '',
    whatsapp: '',
    idioma: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.hotelService.getHotelById(id).subscribe({
        next: (data) => (this.hotel = data),
        error: (err) => console.error('Erro ao carregar hotel:', err)
      });
    }
  }

  salvar() {
    this.hotelService.updateHotel(this.hotel.id!, this.hotel).subscribe({
      next: () => this.router.navigate(['/hoteis']),
      error: (err) => console.error('Erro ao atualizar hotel:', err)
    });
  }
}
