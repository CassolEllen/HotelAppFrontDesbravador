import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HospedeService } from '../services/hospede-service';

@Component({
  selector: 'app-hospede-edit',
  standalone: true,
  templateUrl: './hospedes-edit.html',
  styleUrls: ['./hospedes-edit.css'], 
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class HospedeEditComponent implements OnInit {

  id!: string;
  form!: FormGroup;
  loading = true;   // ⬅ Agora existe

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hospedeService: HospedeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Criação do form
    this.form = this.fb.group({
      nome: ['', Validators.required],
      quarto: ['', Validators.required],

      configuracaoHospede: this.fb.group({
        idioma: ['pt-BR']   
      }),

      contato: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        whatsapp: ['', Validators.required]
      })
    });

    // Pegando ID da URL
    this.id = this.route.snapshot.params['id'];

    // Carrega dados
    this.carregarDados();
  }

  carregarDados() {
    this.hospedeService.buscarPorId(this.id).subscribe({
      next: (h) => {
        this.form.patchValue({
          nome: h.nome,
          quarto: h.quarto,
          contato: {
            email: h.contato?.email,
            whatsapp: h.contato?.whatsapp
          }
        });

        this.loading = false;   // ⬅ Só libera o formulário após carregar
      },
      error: () => {
        alert("Erro ao carregar hóspede");
        this.router.navigate(['/hospedes']);
      }
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.hospedeService.atualizar(this.id, this.form.value).subscribe({
      next: () => {
        alert("Hóspede atualizado com sucesso!");
        this.router.navigate(['/hospedes']);
      },
      error: () => alert('Erro ao salvar')
    });
  }
}
