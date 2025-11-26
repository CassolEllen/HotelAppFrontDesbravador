import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hospedes } from './hospedes-create';

describe('Hospedes', () => {
  let component: Hospedes;
  let fixture: ComponentFixture<Hospedes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hospedes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hospedes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
