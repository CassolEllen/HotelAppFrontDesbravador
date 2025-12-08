import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioResposta } from './formulario-resposta';

describe('FormularioResposta', () => {
  let component: FormularioResposta;
  let fixture: ComponentFixture<FormularioResposta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioResposta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioResposta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
