import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { IUsuario } from '../../../../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../../../../service/botonera.service';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-usuario.admin.routed',
  templateUrl: './usuario.admin.routed.component.component.html',
  styleUrls: ['./usuario.admin.routed.component.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class UsuarioAdminRoutedComponent implements OnInit {
  click: boolean = true;
  orden: string = 'nombre';
  size: number = 10;
  arrUsuarios: IUsuario[] = [];
  page: number = 0; // 0-based server count
  totalPages: number = 0;
  arrBotonera: string[] = [];
  search: string = '';
  private searchSubject = new Subject<string>();
  router: any;

  constructor(private oUsuarioService: UsuarioService, private oBotoneraService: BotoneraService) {}

  ngOnInit() {
    this.getPage();
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.search = searchTerm;
        this.filtar();
      });
  }

  getPage() {
    this.oUsuarioService.getPage(this.page, this.size).subscribe({
      next: (arrUsuario: IPage<IUsuario>) => {
        this.arrUsuarios = arrUsuario.content;
        this.arrBotonera = this.oBotoneraService.getBotonera(this.page, arrUsuario.totalPages);
        this.totalPages = arrUsuario.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editar(oUsuario: IUsuario) {
    console.log('Editar', oUsuario);
  }

  eliminar(oUsuario: number) {
   console.log('Borrar', oUsuario);
  }

  goToPage(p: number) {
    if (p) {
      this.page = p - 1;
      this.getPage();
    }
    return false;
  }

  goToNext() {
    this.page++;
    this.getPage();
    return false;
  }

  goToPrev() {
    this.page--;
    this.getPage();
    return false;
  }

  getPageOrdenAlfabetico(orden: string) {
    this.orden = orden;
    if (!this.click) {
      this.oUsuarioService.getPageOrdenAlfabeticoAsc(this.page, this.size, this.orden).subscribe({
        next: (arrUsuario: IPage<IUsuario>) => {
          this.arrUsuarios = arrUsuario.content;
          this.arrBotonera = this.oBotoneraService.getBotonera(this.page, arrUsuario.totalPages);
          this.totalPages = arrUsuario.totalPages;
          this.click = true;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.oUsuarioService.getPageOrdenAlfabeticoDesc(this.page, this.size, this.orden).subscribe({
        next: (arrUsuario: IPage<IUsuario>) => {
          this.arrUsuarios = arrUsuario.content;
          this.arrBotonera = this.oBotoneraService.getBotonera(this.page, arrUsuario.totalPages);
          this.totalPages = arrUsuario.totalPages;
          this.click = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  filtar() {
    if (this.search) {
      this.oUsuarioService.getSearch(this.size, this.search).subscribe({
        next: (arrUsuario: IPage<IUsuario>) => {
          this.arrUsuarios = arrUsuario.content;
          this.arrBotonera = this.oBotoneraService.getBotonera(this.page, arrUsuario.totalPages);
          this.totalPages = arrUsuario.totalPages;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.getPage();
    }
  }
 

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

}
