import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospedesList } from './hospedes-list';

describe('HospedesList', () => {
  let component: HospedesList;
  let fixture: ComponentFixture<HospedesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospedesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospedesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
