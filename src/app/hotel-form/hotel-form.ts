import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel-service';
import { Hotel } from '../models/hotel-model';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [CommonModule, FormsModule],   
  templateUrl: './hotel-form.html',
  styleUrls: ['./hotel-form.css']
})
export class HotelFormComponent {

  hotel: Hotel = {
    nome: '',
    endereco: '',
    contato: {
      email: '',
      whatsapp: ''
    },
    configuracaoHotel: {
      idioma: ''
    }
  };

  constructor(private hotelService: HotelService, private router: Router) {}

  onSubmit() {
    this.hotelService.createHotel(this.hotel).subscribe({
      next: () => this.router.navigate(['/hoteis']),
      error: (err) => console.error('Erro ao cadastrar hotel:', err)
    });
  }
}
