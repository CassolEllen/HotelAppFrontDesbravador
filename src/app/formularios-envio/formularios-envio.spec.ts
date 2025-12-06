import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosEnvio } from './formularios-envio';

describe('FormulariosEnvio', () => {
  let component: FormulariosEnvio;
  let fixture: ComponentFixture<FormulariosEnvio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulariosEnvio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariosEnvio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
