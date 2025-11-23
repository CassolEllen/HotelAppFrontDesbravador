import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelService } from '../services/hotel.service';

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
    email: '',
    whatsapp: '',
    idioma: ''
  };

  loading = false;
  successMessage = '';
  errorMessage = '';
  titulo = 'Cadastrar Hotel';

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
          this.hotel = {
            id: res.id,
            nome: res.nome ?? '',
            endereco: res.endereco ?? '',
            email: res.email ?? '',
            whatsapp: res.whatsapp ?? '',
            idioma: res.idioma ?? ''
          };

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
        next: () => {
          this.loading = false;
          this.successMessage = 'Hotel atualizado com sucesso!';
          setTimeout(() => this.router.navigate(['/hoteis']), 1500);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Erro ao atualizar hotel.';
        }
      });
    } else {
      this.hotelService.createHotel(this.hotel).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Hotel cadastrado com sucesso!';
          setTimeout(() => this.router.navigate(['/hoteis']), 1500);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Erro ao cadastrar hotel.';
        }
      });
    }
  }
}
