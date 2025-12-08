import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel-service';
import { FormularioService } from '../services/formulario-service';
import { Hotel } from '../models/hotel-model';

@Component({
  selector: 'app-hotel-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-edit.html',
  styleUrls: ['./hotel-edit.css']
})
export class HotelEditComponent implements OnInit {

  hotel: Hotel = {
    id: '',
    nome: '',
    endereco: '',
    contato: { email: '', whatsapp: '' },
    configuracaoHotel: { idioma: 'pt-BR' },
    questionarioSelecionadoId: null
  };

  questionarios: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private questionarioService: FormularioService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Carrega primeiro as opções (questionários) e depois o hotel
      this.carregarDadosParaEdicao(id);
    }
  }

  /**
   * Função de comparação obrigatória para [compareWith].
   * Garante que o Angular compare corretamente o GUID salvo (c1) com os IDs da lista (c2).
   */
  compareFn(c1: any, c2: any): boolean {
    // Retorna true apenas se ambos forem exatamente o mesmo valor ou ambos nulos.
    // Isso é crucial para GUIDs e a opção [ngValue]="null".
    if (c1 === null && c2 === null) {
      return true;
    }
    // Compara os IDs como strings
    return c1 === c2;
  }

  /**
   * Garante que a lista de questionários (opções do select) seja carregada primeiro,
   * e só então carrega os dados do hotel para correta vinculação do ID selecionado.
   */
  carregarDadosParaEdicao(id: string) {
    this.loading = true;

    // 1. Carregar Questionários (Options do Select)
    this.questionarioService.listar().subscribe({
      next: (questionariosRes) => {
        this.questionarios = questionariosRes;
        
        // 2. Carregar o Hotel (Onde está o ID salvo)
        this.hotelService.getHotelById(id).subscribe({
          next: (hotelRes) => {
            
            // 3. Aplica a correção de tipagem/valor (null, string vazia, GUID zerado)
            const questionarioId = hotelRes.questionarioSelecionadoId;

            if (!questionarioId || questionarioId === '00000000-0000-0000-0000-000000000000') {
              hotelRes.questionarioSelecionadoId = null;
            } 
            // Se for um GUID válido, ele será mantido como string.

            this.hotel = hotelRes;
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao carregar hotel:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Erro ao carregar questionários:', err);
        this.loading = false;
      }
    });
  }

  salvar() {
    if (!this.hotel.id) return;

    this.hotelService.updateHotel(this.hotel.id, this.hotel).subscribe({
      next: () => this.router.navigate(['/hoteis']),
      error: (err) => console.error('Erro ao atualizar hotel:', err)
    });
  }

  voltar() {
    this.router.navigate(['/hoteis']);
  }
}