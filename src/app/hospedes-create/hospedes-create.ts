import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HospedeService } from '../services/hospede-service';
import { HospedeDTo } from '../models/hospedes-model';

@Component({
  selector: 'app-hospede-form',
  standalone: true,
  templateUrl: './hospedes-create.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class HospedeComponent {

  form: any; // 👈 agora declarado primeiro

  constructor(
    private fb: FormBuilder,
    private hospedeService: HospedeService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      quarto: ['', Validators.required],
      configuracaoHospede: this.fb.group({
        idioma: ['pt-BR', Validators.required]
      }),
      contato: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        whatsapp: ['', Validators.required]
      })
    });
  }

  salvar() {
    if (this.form.invalid) return;

    const dto: HospedeDTo = this.form.value as HospedeDTo;

    this.hospedeService.criar(dto).subscribe({
      next: () => alert('Hóspede cadastrado com sucesso!'),
      error: () => alert('Erro ao cadastrar hóspede!')
    });
  }
}
