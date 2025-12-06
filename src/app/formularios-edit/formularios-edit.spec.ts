import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosEdit } from './formularios-edit';

describe('FormulariosEdit', () => {
  let component: FormulariosEdit;
  let fixture: ComponentFixture<FormulariosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulariosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariosEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
