import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad3Factura } from './actividad3-factura';

describe('Actividad3Factura', () => {
  let component: Actividad3Factura;
  let fixture: ComponentFixture<Actividad3Factura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad3Factura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actividad3Factura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
