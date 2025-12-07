import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel-service';

@Component({
  selector: 'app-hotel-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hotel-create.html',
  styleUrls: ['./hotel-create.css']
})
export class HotelCreateComponent {
  hotelForm: FormGroup;
  sucesso: string | null = null;
  erro: string | null = null;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router
  ) {
    this.hotelForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      endereco: ['', [Validators.required, Validators.minLength(3)]],
      contato: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        whatsapp: ['', Validators.required]
      }),
      configuracaoHotel: this.fb.group({
        idioma: ['pt-BR', Validators.required]
      }),
      questionarioSelecionadoId: [null]
    });
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) return;

    // envia no formato HotelDTo (contato + configuracao)
    this.hotelService.createHotel(this.hotelForm.value).subscribe({
      next: () => {
        this.sucesso = 'Hotel cadastrado com sucesso!';
        this.erro = null;
        this.router.navigate(['/hoteis']);
      },
      error: (err) => {
        console.error(err);
        this.erro = 'Erro ao cadastrar hotel';
        this.sucesso = null;
      }
    });
  }
}
