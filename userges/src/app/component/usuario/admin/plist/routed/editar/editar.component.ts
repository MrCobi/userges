import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuarioid: number = 0;
  usuario: IUsuario = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: ''
  };

  constructor(
    private oUsuarioService: UsuarioService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder 
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      email: [''],
    });

    this.route.params.subscribe(params => {
      this.usuarioid = +params['id']; 
      this.imprimirUsuario();
    });
  }

  imprimirUsuario() {
    this.oUsuarioService.getUsuario(this.usuarioid).subscribe({
      next: (oUsuario) => {
        this.usuario.id = oUsuario.id;
        this.usuario.nombre = oUsuario.nombre;
        this.usuario.apellido1 = oUsuario.apellido1;
        this.usuario.apellido2 = oUsuario.apellido2;
        this.usuario.email = oUsuario.email;

        // Actualiza los valores del formulario
        this.form.patchValue(this.usuario);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

    actualizar() {
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido1 = this.form.value.apellido1;
      this.usuario.apellido2 = this.form.value.apellido2;
      this.usuario.email = this.form.value.email;
      
      this.oUsuarioService.actualizarUsuario(this.usuario).subscribe({
        next: () => {
          window.history.back();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
      
cancelar() {
  window.history.back();
}

}
