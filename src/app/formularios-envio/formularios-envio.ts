import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  FormControl, 
  ReactiveFormsModule 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioService } from '../services/formulario-service';

@Component({
  selector: 'app-envio-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formularios-envio.html',
  styleUrls: ['./formularios-envio.css']
})
export class EnvioFormularioComponent implements OnInit {

  hospedeId!: string;
  questionarioId!: string;

  questionario: any;
  form!: FormGroup;
  enviado = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: FormularioService
  ) {}

  ngOnInit(): void {
    // 1. Obtém IDs da URL
    this.hospedeId = String(this.route.snapshot.queryParamMap.get('hospede'));
    this.questionarioId = String(this.route.snapshot.queryParamMap.get('questionario'));

    this.form = this.fb.group({});

    // 2. Chama a API para buscar o questionário
    this.service.buscarPorId(this.questionarioId)
      .subscribe({
        next: (res: any) => {
          // Garante que o *ngIf no HTML seja exibido
          this.questionario = res; 
          console.log("✅ Questionário carregado com sucesso:", res);

          // 3. Processa e adiciona controles ao formulário
          res.perguntas.forEach((p: any) => {
            
            // ⭐ CORREÇÃO DE TIPO: Garante que p.tipo seja um número (1, 2, 3...)
            const tipoPergunta = Number(p.tipo);
            p.tipo = tipoPergunta; // Necessário para o [ngSwitch] do HTML

            let control: FormControl;

            // Define o controle de formulário baseado no tipo
            if (tipoPergunta === 5) { // CHECKBOX → array vazio
              control = new FormControl([]);
            }
            else if (tipoPergunta === 1) { // TEXTO → sem validação obrigatória
              control = new FormControl('');
            }
            else { // Outros (select, radio, nota, data) → obrigatório
              control = new FormControl('', Validators.required);
            }

            this.form.addControl(p.id, control);
          });
        },
        error: (err) => {
          // 🛑 DEBUG: Se esta mensagem aparecer, a API falhou.
          console.error("🛑 ERRO: Falha ao carregar questionário. Verifique a API/Rede.", err);
          // O formulário permanecerá oculto porque this.questionario é null/undefined
        }
      });
  }

  // PROCESSAMENTO DE CHECKBOX
  onCheckboxChange(event: any, perguntaId: string) {
    const control = this.form.get(perguntaId);
    if (!control) return;

    const value = event.target.value;
    const checked = event.target.checked;

    let current = control.value || [];

    if (checked) {
      current.push(value);
    } else {
      current = current.filter((v: any) => v !== value);
    }

    control.setValue(current);
  }

  enviar() {
    if (this.form.invalid) return;

    const respostasFormatadas = this.questionario.perguntas.map((p: any) => ({
      perguntaId: p.id,
      resposta: this.form.value[p.id]
    }));

    const payload = {
      hospedeId: this.hospedeId,
      questionarioId: this.questionarioId,
      respostas: respostasFormatadas
    };

    console.log("ENVIANDO PAYLOAD:", payload);

    // LÓGICA DE ENVIO AQUI
    // this.http.post('https://localhost:7092/api/DadosFormulario/EnvioFormulario', payload)
    //   .subscribe(...);

    this.enviado = true;
  }
}