import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class EliminarComponent implements OnInit {

  usuarioid: number = 0;
  usuario: IUsuario = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: ''
  };

  constructor(private oUsuarioService: UsuarioService, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuarioid = +params['id']; 
      this.imprimirUsuario();
      console.log('ID del usuario:', this.usuarioid);
    });
    
  }
  

  confirmar(){
    this.oUsuarioService.eliminarUsuario(this.usuarioid).subscribe({
      next: () => {
        alert('Usuario eliminado');
        window.history.back();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  imprimirUsuario(){
    this.oUsuarioService.getUsuario(this.usuarioid).subscribe({
      next: (oUsuario) => {
        this.usuario.id = oUsuario.id;
        this.usuario.nombre = oUsuario.nombre;
        this.usuario.apellido1 = oUsuario.apellido1;
        this.usuario.apellido2 = oUsuario.apellido2;
        this.usuario.email = oUsuario.email;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
