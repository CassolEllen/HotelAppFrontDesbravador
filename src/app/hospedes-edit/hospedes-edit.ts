import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HospedeService } from '../services/hospede-service';

@Component({
  selector: 'app-hospede-edit',
  standalone: true,
  templateUrl: './hospedes-edit.html',
  imports: [
    CommonModule,
    ReactiveFormsModule   // ✅ IMPORTANTE
  ]
})
export class HospedeEditComponent implements OnInit {

  id!: string;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hospedeService: HospedeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: ['', Validators.required],
      quarto: ['', Validators.required],

      contato: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        whatsapp: ['', Validators.required]
      })
    });

    this.id = this.route.snapshot.params['id'];
    this.carregarDados();
  }

  carregarDados() {
    this.hospedeService.buscarPorId(this.id).subscribe(h => {
      this.form.patchValue({
        nome: h.nome,
        quarto: h.quarto,
        contato: {
          email: h.contato?.email,
          whatsapp: h.contato?.whatsapp
        }
      });
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.hospedeService.atualizar(this.id, this.form.value).subscribe({
      next: () => this.router.navigate(['/hospede/listar']),
      error: () => alert('Erro ao salvar')
    });
  }
}
