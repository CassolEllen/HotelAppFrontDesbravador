import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common'; // <-- Importar Location
import { HospedeService } from '../services/hospede-service';

@Component({
  selector: 'app-hospedes-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hospedes-edit.html',
  styleUrls: ['./hospedes-edit.css'], 

})
export class HospedesEditComponent implements OnInit {

  form!: FormGroup;
  loading = true;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: HospedeService,
    private location: Location // <-- INJETAR LOCATION
  ) {}

  ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      nome: ['', Validators.required],
      quarto: ['', Validators.required],
      configuracaoHospede: this.fb.group({
        idioma: ['pt-BR']   
      }),
      contato: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        whatsapp: ['', Validators.required],
      })
    });

    this.carregarHospede();
  }
  
  // NOVO MÉTODO: VOLTAR COM PROTEÇÃO
  voltar(): void {
    // Verifica se o formulário foi modificado
    if (this.form.dirty) {
      const confirmacao = confirm('Você tem alterações não salvas. Deseja realmente voltar e perder as alterações?');
      if (confirmacao) {
        this.location.back();
      }
    } else {
      // Se não há alterações, volta normalmente
      this.location.back();
    }
  }

  carregarHospede() {
    this.service.buscarPorId(this.id).subscribe({
      next: (res: any) => {
        this.form.patchValue(res);
        this.loading = false;
        // Importante: reset() marca o form como pristine (não sujo) após o carregamento
        this.form.markAsPristine(); 
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
        // Marca o form como não sujo após salvar com sucesso
        this.form.markAsPristine(); 
      },
      error: () => {
        alert("Erro ao salvar alterações");
      }
    });
  }
}