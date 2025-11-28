import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad3LazyLoading } from './actividad3-lazy-loading';

describe('Actividad3LazyLoading', () => {
  let component: Actividad3LazyLoading;
  let fixture: ComponentFixture<Actividad3LazyLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad3LazyLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actividad3LazyLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
