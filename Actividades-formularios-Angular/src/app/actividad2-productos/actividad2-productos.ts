import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  categoria: string;
}

@Component({
  selector: 'app-actividad2-productos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actividad2-productos.html',
  styleUrls: ['./actividad2-productos.css']
})
export class Actividad2ProductosComponent implements OnInit {
  productosForm!: FormGroup;
  productos: Producto[] = [];
  proximoId = 1;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.productosForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      cantidad: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      categoria: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productosForm.valid) {
      const nuevoProducto: Producto = {
        id: this.proximoId++,
        ...this.productosForm.value
      };
      this.productos.push(nuevoProducto);
      console.log('Productos:', this.productos);
      this.productosForm.reset();
    } else {
      console.log('Formulario inválido');
    }
  }

  obtenerProducto(id: number) {
    return this.productos.find(p => p.id === id);
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  calcularTotal(): number {
    return this.productos.reduce((total, p) => total + (p.precio * p.cantidad), 0);
  }

  get nombre() {
    return this.productosForm.get('nombre');
  }

  get descripcion() {
    return this.productosForm.get('descripcion');
  }

  get precio() {
    return this.productosForm.get('precio');
  }

  get cantidad() {
    return this.productosForm.get('cantidad');
  }

  get categoria() {
    return this.productosForm.get('categoria');
  }
}