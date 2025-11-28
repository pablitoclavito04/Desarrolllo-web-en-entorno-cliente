import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad1RutasBasicas } from './actividad1-rutas-basicas';

describe('Actividad1RutasBasicas', () => {
  let component: Actividad1RutasBasicas;
  let fixture: ComponentFixture<Actividad1RutasBasicas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad1RutasBasicas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actividad1RutasBasicas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
