import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioQuestionario } from './relatorio-questionario';

describe('RelatorioQuestionario', () => {
  let component: RelatorioQuestionario;
  let fixture: ComponentFixture<RelatorioQuestionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioQuestionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioQuestionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
