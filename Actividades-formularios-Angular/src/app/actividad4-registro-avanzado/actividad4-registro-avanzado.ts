import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidatorsService } from './validators';

@Component({
  selector: 'app-actividad4-registro-avanzado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actividad4-registro-avanzado.html',
  styleUrls: ['./actividad4-registro-avanzado.css']
})
export class Actividad4RegistroAvanzadoComponent implements OnInit {
  registroForm!: FormGroup;
  enviando = false;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.registroForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this.validatorsService.validarUsernameDisponible()]
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.validatorsService.validarEmailUnico()]
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terminos: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.enviando = true;
      // Simular envío a servidor
      setTimeout(() => {
        console.log('Registro completado:', this.registroForm.value);
        this.enviando = false;
        alert('¡Registro completado exitosamente!');
        this.registroForm.reset();
      }, 2000);
    }
  }

  validarCampo(nombreCampo: string): boolean {
    const control = this.registroForm.get(nombreCampo);
    return control?.invalid && control?.touched || false;
  }

  mostrarCargando(nombreCampo: string): boolean {
    const control = this.registroForm.get(nombreCampo);
    return control?.pending || false;
  }

  get username() {
    return this.registroForm.get('username');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }

  get terminos() {
    return this.registroForm.get('terminos');
  }
}