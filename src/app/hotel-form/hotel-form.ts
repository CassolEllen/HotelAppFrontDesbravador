import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
export class HotelFormComponent implements OnInit {
  hotel = {
    id: '',
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
  titulo = 'Cadastrar Novo Hotel';

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.titulo = 'Editar Hotel';
      this.loading = true;

      this.hotelService.getHotelById(id).subscribe({
        next: (res) => {
          this.hotel = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar hotel:', err);
          this.errorMessage = 'Erro ao carregar dados do hotel.';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    
    if (this.hotel.id) {
      this.hotelService.updateHotel(this.hotel.id, this.hotel).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = '✅ Hotel atualizado com sucesso!';
          console.log('Hotel atualizado:', res);
          setTimeout(() => this.router.navigate(['/hoteis']), 2000);
        },
        error: (err) => {
          this.loading = false;
          console.error('Erro ao atualizar hotel:', err);
          this.errorMessage =
            '❌ Erro ao atualizar o hotel. Verifique os dados e tente novamente.';
        }
      });
    } else {
      this.hotelService.createHotel(this.hotel).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = '🏨 Hotel cadastrado com sucesso!';
          console.log('Hotel cadastrado:', res);
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
}
