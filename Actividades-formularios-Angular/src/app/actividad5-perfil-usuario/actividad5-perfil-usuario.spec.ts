import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad5PerfilUsuario } from './actividad5-perfil-usuario';

describe('Actividad5PerfilUsuario', () => {
  let component: Actividad5PerfilUsuario;
  let fixture: ComponentFixture<Actividad5PerfilUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad5PerfilUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actividad5PerfilUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
