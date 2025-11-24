import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actividad2ProductosComponent } from './actividad2-productos';

describe('Actividad2ProductosComponent', () => {
  let component: Actividad2ProductosComponent;
  let fixture: ComponentFixture<Actividad2ProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividad2ProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actividad2ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});