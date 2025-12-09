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
    
    this.hospedeId = String(this.route.snapshot.queryParamMap.get('hospede'));
    this.questionarioId = String(this.route.snapshot.queryParamMap.get('questionario'));

    this.form = this.fb.group({});

    
    this.service.buscarPorId(this.questionarioId)
      .subscribe({
        next: (res: any) => {
          
          this.questionario = res; 
          console.log("✅ Questionário carregado com sucesso:", res);

          
          res.perguntas.forEach((p: any) => {
            
            
            const tipoPergunta = Number(p.tipo);
            p.tipo = tipoPergunta; 

            let control: FormControl;

            
            if (tipoPergunta === 5) { 
              control = new FormControl([]);
            }
            else if (tipoPergunta === 1) { 
              control = new FormControl('');
            }
            else { 
              control = new FormControl('', Validators.required);
            }

            this.form.addControl(p.id, control);
          });
        },
        error: (err) => {
          
          console.error("🛑 ERRO: Falha ao carregar questionário. Verifique a API/Rede.", err);
          
        }
      });
  }

  
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


    this.enviado = true;
  }
}