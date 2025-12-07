import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario-service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrls: ['./usuario-form.css']
})
export class UsuarioFormComponent implements OnInit {

  form!: FormGroup;
  id: string | null = null;
  editando = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editando = !!this.id;

    this.form = this.fb.group({
      nome: ['', Validators.required],

      contato: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        whatsapp: ['']
      }),

      credenciais: this.fb.group({
        senha: ['', this.editando ? [] : Validators.required],
        confirmarSenha: ['', this.editando ? [] : Validators.required]
      }),

      papel: [0, Validators.required],
      tipoUsuario: [0, Validators.required]
    });

    if (this.editando) {
      this.usuarioService.buscarUsuarioPorId(this.id!).subscribe((usuario: any) => {
        this.form.patchValue({
          nome: usuario.nome,
          contato: {
            email: usuario.contato?.email,
            whatsapp: usuario.contato?.whatsapp
          },
          papel: usuario.papel,
          tipoUsuario: usuario.tipoUsuario
        });
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const { senha, confirmarSenha } = this.form.value.credenciais;

    if (!this.editando && senha !== confirmarSenha) {
      alert("As senhas não são iguais!");
      return;
    }

    const usuarioDto = {
      nome: this.form.value.nome,
      contato: {
        email: this.form.value.contato.email,
        whatsapp: this.form.value.contato.whatsapp
      },
      senha: senha || null,
      papel: this.form.value.papel,
      tipoUsuario: this.form.value.tipoUsuario
    };

    console.log("Enviando DTO:", usuarioDto);

    if (this.editando) {
      this.usuarioService.atualizarUsuario(this.id!, usuarioDto).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    } else {
      this.usuarioService.criarUsuario(usuarioDto).subscribe({
        next: () => this.router.navigate(['/usuarios']),
        error: (err) => {
          console.error("Erro ao cadastrar:", err);
          alert("Erro ao cadastrar usuário.");
        }
      });
    }
  }
}
