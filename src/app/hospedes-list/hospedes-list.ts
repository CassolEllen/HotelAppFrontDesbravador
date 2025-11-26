import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HospedeService } from '../services/hospede-service';
import { HospedeResponseDTo } from '../models/hospedes-model';

@Component({
  selector: 'app-hospedes-list',
  standalone: true,
  templateUrl: './hospedes-list.html',
  imports: [CommonModule, RouterModule]
})
export class HospedesListComponent implements OnInit {

  hospedes: HospedeResponseDTo[] = [];
  carregando = true;

  constructor(private hospedeService: HospedeService) {}

  ngOnInit(): void {
    this.carregarHospedes();
  }

  carregarHospedes() {
    this.carregando = true;

    this.hospedeService.listar().subscribe({
      next: (res) => {
        this.hospedes = res;
        this.carregando = false;
      },
      error: () => {
        alert("Erro ao carregar lista de hóspedes!");
        this.carregando = false;
      }
    });
  }

  excluir(id: string) {
    if (!confirm("Tem certeza que deseja excluir este hóspede?")) return;

    this.hospedeService.remover(id).subscribe({
      next: () => {
        alert("Hóspede excluído!");
        this.carregarHospedes();
      },
      error: () => alert("Erro ao excluir")
    });
  }
}
