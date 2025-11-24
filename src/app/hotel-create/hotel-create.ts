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
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', Validators.required],
      idioma: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) return;

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
