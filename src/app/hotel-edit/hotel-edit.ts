// components/hotel-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel-service';
import { FormularioService } from '../services/formulario-service';
import { Hotel } from '../models/hotel-model';

@Component({
  selector: 'app-hotel-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-edit.html',
})
export class HotelEditComponent implements OnInit {

  hotel: Hotel = {
    id: '',
    nome: '',
    endereco: '',
    contato: { email: '', whatsapp: '' },
    configuracaoHotel: { idioma: 'pt-BR' },
    questionarioSelecionadoId: null
  };

  questionarios: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private questionarioService: FormularioService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarHotel(id);
      this.carregarQuestionarios();
    }
  }

carregarHotel(id: string) {
  this.loading = true;

  this.hotelService.getHotelById(id).subscribe({
    next: (res) => {
      this.hotel = res;
      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}


  carregarQuestionarios() {
    this.questionarioService.listar().subscribe({
      next: (res) => this.questionarios = res,
      error: (err) => console.error('Erro ao carregar questionarios:', err)
    });
  }

  salvar() {
    if (!this.hotel.id) return;

    this.hotelService.updateHotel(this.hotel.id, this.hotel).subscribe({
      next: () => this.router.navigate(['/hoteis']),
      error: (err) => console.error('Erro ao atualizar hotel:', err)
    });
  }
}
