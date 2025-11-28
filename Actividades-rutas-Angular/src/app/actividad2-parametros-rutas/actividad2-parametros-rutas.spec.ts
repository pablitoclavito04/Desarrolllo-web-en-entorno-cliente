import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad2ParametrosRutas } from './actividad2-parametros-rutas';

describe('Actividad2ParametrosRutas', () => {
  let component: Actividad2ParametrosRutas;
  let fixture: ComponentFixture<Actividad2ParametrosRutas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad2ParametrosRutas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actividad2ParametrosRutas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
