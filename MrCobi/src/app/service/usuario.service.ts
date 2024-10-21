import { Injectable } from '@angular/core';
import { IUsuario } from '../model/usuario.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  constructor(private oHttp: HttpClient) {}

  getPage(page: number, size: number): Observable<IPage<IUsuario>> {
    return this.oHttp.get<IPage<IUsuario>>(
      'http://localhost:8085' + '/usuario?page=' + page + '&size=' + size
    );
  }

  getPageOrdenAlfabeticoAsc(page: number, size: number, sort: string): Observable<IPage<IUsuario>> {
    return this.oHttp.get<IPage<IUsuario>>(
      'http://localhost:8085' + '/usuario?page=' + page + '&size=' + size + '&sort=' + sort + ',asc'
    );
  }

  getPageOrdenAlfabeticoDesc(page: number, size: number, sort: string): Observable<IPage<IUsuario>> {
    return this.oHttp.get<IPage<IUsuario>>(
      'http://localhost:8085' + '/usuario?page=' + page + '&size=' + size + '&sort=' + sort + ',desc'
    );
  }

  getSearch(size: number, search: string): Observable<IPage<IUsuario>> {
    return this.oHttp.get<IPage<IUsuario>>(
      'http://localhost:8085/usuario?size=' + size + '&filter=' + search
    );
}

getUsuario(id: number): Observable<IUsuario> {
  return this.oHttp.get<IUsuario>('http://localhost:8085/usuario/' + id);
}

eliminarUsuario(id: number): Observable<any> {
  return this.oHttp.delete<any>('http://localhost:8085/usuario/' + id);
}

}
