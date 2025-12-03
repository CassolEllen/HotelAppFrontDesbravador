import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HospedeService } from '../services/hospede-service';

@Component({
  selector: 'app-hospedes-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- essencial para *ngFor, *ngIf e routerLink
  templateUrl: './hospedes-list.html'
})
export class HospedesListComponent implements OnInit {
  hospedes: any[] = [];
  carregando = false;

  constructor(private hospedeService: HospedeService, private router: Router) {}

  ngOnInit(): void {
    this.carregarHospedes();
  }

  carregarHospedes() {
    this.carregando = true;
    this.hospedeService.listar().subscribe({
      next: (res) => {
        this.hospedes = res ?? [];
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar hóspedes', err);
        alert('Erro ao carregar lista de hóspedes!');
        this.carregando = false;
      }
    });
  }

  criar() {
    this.router.navigate(['/hospedes/novo']); // ajuste pra sua rota
  }

  editar(id: string) {
    this.router.navigate(['/hospedes/editar', id]); // ajuste pra sua rota
  }

  deletar(id: string) {
    if (!confirm('Tem certeza que deseja excluir este hóspede?')) return;
    this.hospedeService.remover(id).subscribe({
      next: () => this.carregarHospedes(),
      error: (err) => {
        console.error('Erro ao excluir hóspede', err);
        alert('Erro ao excluir hóspede');
      }
    });
  }

  checkout(id: string) {
  if (!confirm("Deseja enviar o formulário de checkout para este hóspede?")) return;

  this.carregando = true;

  this.hospedeService.checkout(id).subscribe({
    next: (res) => {
      alert(res);
      this.carregando = false;
    },
    error: (err) => {
      console.error("Erro ao enviar checkout", err);
      alert("Erro ao enviar e-mail de checkout.");
      this.carregando = false;
    }
  });
}
}
