import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-list.html',
})
export class HotelListComponent implements OnInit {
  hoteis: any[] = [];
  loading = false;

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.carregarHoteis();
  }

  carregarHoteis(): void {
    this.loading = true;
    this.hotelService.getHoteis().subscribe({
      next: (res: any) => {
        this.hoteis = res;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar hotéis:', err);
        this.loading = false;
      },
    });
  }

  novoHotel(): void {
    this.router.navigate(['/hoteis/novo']);
  }

  editarHotel(id: string): void {
    this.router.navigate(['/hoteis/editar', id]);
  }

  deleteHotel(id: string): void {
    if (confirm('Tem certeza que deseja excluir este hotel?')) {
      this.hotelService.deleteHotel(id).subscribe({
        next: () => {
          alert('Hotel excluído com sucesso!');
          this.carregarHoteis();
        },
        error: (err: any) => {
          console.error('Erro ao excluir hotel:', err);
          alert('Erro ao excluir hotel.');
        },
      });
    }
  }
}
