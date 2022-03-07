import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Atributos
  private url: string;
  public logueado: boolean;
  public usuario: Usuario;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000';
    this.logueado = false;
  }

  register(usuario: Usuario): Observable<Object> {
    let urlRegistro = this.url + '/registro';
    return this.http.post(urlRegistro, usuario);
  }
  
  login (usuario: Usuario): Observable<Object> {
    let urlLogin = this.url + '/login';
    return this.http.post(urlLogin, usuario);
  }

  edit(usuario: Usuario): Observable<Object> {
    let urlRegistro = this.url + '/registro';
    return this.http.put(urlRegistro, usuario);
  }
}
