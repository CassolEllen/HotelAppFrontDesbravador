import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService, CreateHotelDTO } from '../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hotel-form.html'
})
export class HotelFormComponent {
  hotel: CreateHotelDTO = {
    nome: '',
    endereco: '',
    contato: {
      telefone: '',
      whatsapp: '',
      email: ''
    },
    configuracaoHotel: {
      quantidadeQuartos: 0,
      quantidadeAndares: 0,
      possuiPiscina: false
    }
  };

  constructor(private hotelService: HotelService, private router: Router) {}

  onSubmit(): void {
    this.hotelService.createHotel(this.hotel).subscribe({
      next: (res) => {
        console.log('Hotel cadastrado com sucesso:', res);
        this.router.navigate(['/hoteis']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar hotel:', err);
      }
    });
  }
}
