import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormularioService } from '../services/formulario-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formularios-create',
  standalone: true,
  templateUrl: './formularios-create.html',
  styleUrls: ['./formularios-create.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class FormulariosCreate {

  form: FormGroup;
  erro: string | null = null;
  sucesso: string | null = null;

  tipos = [
    { id: 1, label: "Texto" },
    { id: 2, label: "Múltipla escolha" },
    { id: 3, label: "Nota" },
    { id: 4, label: "Única escolha" },
    { id: 5, label: "Checkbox" },
    { id: 6, label: "Data" }
  ];

  constructor(
    private fb: FormBuilder,
    private service: FormularioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      perguntas: this.fb.array([])
    });
  }

  get perguntas(): FormArray {
    return this.form.get('perguntas') as FormArray;
  }

  getOpcoes(i: number): FormArray {
    return this.perguntas.at(i).get('opcoes') as FormArray;
  }

  addPergunta() {
    this.perguntas.push(this.fb.group({
      descricao: ['', Validators.required],
      tipoPergunta: [1, Validators.required],
      opcoes: this.fb.array([]),
      notaMin: [null],
      notaMax: [null]
    }));
  }

  addOpcao(i: number) {
    this.getOpcoes(i).push(this.fb.control('', Validators.required));
  }

  enviar() {
    this.erro = null;
    this.sucesso = null;

    if (this.form.invalid) {
      this.erro = "Preencha todos os campos obrigatórios.";
      return;
    }

    let payload = structuredClone(this.form.value); //  ✅ evita modificar o form original

    const perguntas = [];

    for (let p of payload.perguntas) {

      p.tipoPergunta = Number(p.tipoPergunta);

      // 🔥 TIPOS QUE PRECISAM DE OPÇÕES
      if ([2, 4, 5].includes(p.tipoPergunta)) {
        if (!p.opcoes || p.opcoes.length === 0) {
          this.erro = "Perguntas de múltipla escolha precisam de opções.";
          return;
        }
      } else {
        delete p.opcoes;
      }

      // 🔥 VALIDAÇÃO DE NOTA
      if (p.tipoPergunta === 3) {
        if (p.notaMin == null || p.notaMax == null) {
          this.erro = "Preencha Nota Mínima e Máxima.";
          return;
        }
        if (p.notaMin >= p.notaMax) {
          this.erro = "Nota mínima deve ser menor que a máxima.";
          return;
        }
      } else {
        delete p.notaMin;
        delete p.notaMax;
      }

      perguntas.push(p); //  ✅ não insere null
    }

    payload.perguntas = perguntas;

    this.service.criarQuestionario(payload).subscribe({
      next: () => {
        this.sucesso = "Questionário criado com sucesso!";
        this.router.navigate(['/formularios']);
      },
      error: err => {
        this.erro = err.error?.message ?? "Erro ao criar questionário.";
      }
    });
  }
}
