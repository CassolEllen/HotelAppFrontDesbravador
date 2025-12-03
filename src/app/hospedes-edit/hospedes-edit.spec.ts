import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospedesEdit } from './hospedes-edit';

describe('HospedesEdit', () => {
  let component: HospedesEdit;
  let fixture: ComponentFixture<HospedesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospedesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospedesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
