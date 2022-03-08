import { Injectable } from '@angular/core';
import { Libro } from '../models/libro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private url: string;

  constructor(private http: HttpClient, private us: UsuarioService) { 
    this.url = 'http://localhost:3000/libros';
  }

  public getAll(): Observable<Object> {
    let urlIdUsuario = this.url + '/?id_usuario=' + this.us.usuario.id_usuario.toString();
    return this.http.get(urlIdUsuario);
  }

  public getOne(id_libro: number): Observable<Object> {
    let urlIdLibro = this.url +'/?id_usuario=' + this.us.usuario.id_usuario.toString() + '&id_libro=' + id_libro.toString();
    return this.http.get(urlIdLibro)
  }

  public add(libro: Libro): Observable<Object> {
    return this.http.post(this.url, libro)
  }

  public edit(libro: Libro): Observable<Object> {
    return this.http.put(this.url, libro)
  }

  public delete(id_libro: number): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
      body: { id_libro: id_libro },
    };
    return this.http.delete(this.url, options)
  }
}

