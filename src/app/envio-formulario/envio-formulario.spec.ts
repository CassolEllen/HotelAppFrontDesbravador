import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioFormulario } from './envio-formulario';

describe('EnvioFormulario', () => {
  let component: EnvioFormulario;
  let fixture: ComponentFixture<EnvioFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvioFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
