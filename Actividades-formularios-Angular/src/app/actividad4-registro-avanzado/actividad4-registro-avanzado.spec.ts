import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad4RegistroAvanzado } from './actividad4-registro-avanzado';

describe('Actividad4RegistroAvanzado', () => {
  let component: Actividad4RegistroAvanzado;
  let fixture: ComponentFixture<Actividad4RegistroAvanzado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad4RegistroAvanzado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actividad4RegistroAvanzado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
