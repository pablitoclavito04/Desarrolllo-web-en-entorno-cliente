import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad5NavigationExtras } from './actividad5-navigation-extras';

describe('Actividad5NavigationExtras', () => {
  let component: Actividad5NavigationExtras;
  let fixture: ComponentFixture<Actividad5NavigationExtras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad5NavigationExtras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actividad5NavigationExtras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
