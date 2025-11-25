import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosCreate } from './formularios-create';

describe('FormulariosCreate', () => {
  let component: FormulariosCreate;
  let fixture: ComponentFixture<FormulariosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulariosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariosCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
