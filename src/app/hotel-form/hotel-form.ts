import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hotel-form.html',
  styleUrls: ['./hotel-form.css']
})
export class HotelFormComponent {
  hotel = {
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

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private hotelService: HotelService, private router: Router) {}

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    this.hotelService.createHotel(this.hotel).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = '🏨 Hotel cadastrado com sucesso!';
        console.log('Hotel cadastrado:', res);

        // Redireciona após 2 segundos
        setTimeout(() => this.router.navigate(['/hoteis']), 2000);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro ao cadastrar hotel:', err);
        this.errorMessage =
          '❌ Erro ao cadastrar o hotel. Verifique os dados e tente novamente.';
      }
    });
  }
}
