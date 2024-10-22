import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { ActivatedRoute } from '@angular/router'
import { RouterModule } from '@angular/router'
import { UsuarioService } from '../../../../../../service/usuario.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class ViewComponent implements OnInit {

  usuarioid: number = 0;
  usuario: IUsuario = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: ''
  };

  constructor(private route: ActivatedRoute,private oUsuarioService: UsuarioService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuarioid = +params['id']; 
      this.imprimirUsuario();
      console.log('ID del usuario:', this.usuarioid);
    });
    
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
