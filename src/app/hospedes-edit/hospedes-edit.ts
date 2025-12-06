import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HospedeService } from '../services/hospede-service';

@Component({
  selector: 'app-hospedes-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hospedes-edit.html',
<<<<<<< HEAD
  styleUrl: './hospedes-edit.css'
=======
  styleUrls: ['./hospedes-edit.css'], 
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
>>>>>>> a5b77af5fa79e712d1fc75b75254a8d802589009
})
export class HospedesEditComponent implements OnInit {

  form!: FormGroup;
  loading = true;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: HospedeService
  ) {}

  ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      nome: ['', Validators.required],
      quarto: ['', Validators.required],
<<<<<<< HEAD
=======

      configuracaoHospede: this.fb.group({
        idioma: ['pt-BR']   
      }),

>>>>>>> a5b77af5fa79e712d1fc75b75254a8d802589009
      contato: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        whatsapp: ['', Validators.required],
      })
    });

    this.carregarHospede();
  }

  carregarHospede() {
    this.service.buscarPorId(this.id).subscribe({
      next: (res: any) => {
        this.form.patchValue(res);
        this.loading = false;
      },
      error: () => {
        alert("Erro ao carregar hóspede");
        this.loading = false;
      }
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.service.atualizar(this.id, this.form.value).subscribe({
      next: () => {
        alert("Dados atualizados com sucesso!");
      },
      error: () => {
        alert("Erro ao salvar alterações");
      }
    });
  }
}
