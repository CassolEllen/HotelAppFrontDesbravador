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
    contato: { telefone: '', whatsapp: '', email: '' },
    configuracaoHotel: { quantidadeQuartos: 0, quantidadeAndares: 0, possuiPiscina: false }
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
    if (this.hotel.id) {
      this.hotelService.updateHotel(this.hotel.id, this.hotel).subscribe({
        next: () => this.router.navigate(['/hoteis']),
        error: (err) => console.error('Erro ao atualizar hotel:', err)
      });
    } else {
      this.hotelService.createHotel(this.hotel as any).subscribe({
        next: () => this.router.navigate(['/hoteis']),
        error: (err) => console.error('Erro ao criar hotel:', err)
      });
    }
  }
}
