import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class CrearComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: IUsuario = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: ''
  };

  constructor(private oUsuarioService: UsuarioService,private fb: FormBuilder ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      email: [''],
    });

  }

  actualizar() {
    this.usuario.nombre = this.form.value.nombre;
    this.usuario.apellido1 = this.form.value.apellido1;
    this.usuario.apellido2 = this.form.value.apellido2;
    this.usuario.email = this.form.value.email;
  }

  crear() {
    this.actualizar();
    this.oUsuarioService.crearUsuario(this.usuario).subscribe({
      next: (data) => {
        alert('Usuario creado');
        window.history.back();
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
