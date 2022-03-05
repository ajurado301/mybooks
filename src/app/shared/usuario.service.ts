import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { NotificacionService } from './notificacion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Atributos
  private url: string;
  public logueado: boolean;
  public usuario: Usuario;

  constructor(private ns: NotificacionService,
              private http: HttpClient) {
    this.logueado = false;
  }

  register(usuario: Usuario) {
    this.url = 'http://localhost:3000/registro';
    return this.http.post(this.url, usuario);
  }
  
  login (usuario: Usuario) {
    this.url = 'http://localhost:3000/login';
    return this.http.post(this.url, usuario);
  }
  // register(usuario: Usuario): Observable<respApiUsuario> {
  //   this.url = 'http://localhost:3000/registro';
  //   return this.http.post<respApiUsuario>(this.url, usuario);
  // }
  
  // login (usuario: Usuario): void {
  //   this.ns.mostrarSuccess('UsuarioService login works!!', 'Correcto')
  // }
}
