import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HospedeService } from '../services/hospede-service';
import { HospedeDTo } from '../models/hospedes-model';

@Component({
  selector: 'app-hospede-create',
  standalone: true,
  templateUrl: './hospedes-create.html',
  styleUrls: ['./hospedes-create.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class HospedeCreateComponent {

  form: any;

  constructor(
    private fb: FormBuilder,
    private hospedeService: HospedeService,
    private router: Router
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

    const dto: HospedeDTo = this.form.value;

    this.hospedeService.criar(dto).subscribe({
      next: () => {
        alert("Hóspede cadastrado!");
        this.router.navigate(['/hospedes']);
      },
      error: () => alert("Erro ao cadastrar")
    });
  }
}
