import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.html',
  styleUrls: ['./hotel-form.css']
})
export class HotelFormComponent {
  hotel = {
    nome: '',
    endereco: '',
    contatoId: '',
    configuracaoHotelId: ''
  };

  constructor(private hotelService: HotelService, private router: Router) {}

  onSubmit(): void {
    this.hotelService.createHotel(this.hotel).subscribe({
      next: () => {
        alert('Hotel cadastrado com sucesso!');
        this.router.navigate(['/hoteis']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar hotel');
      }
    });
  }
}
