import { Injectable } from '@angular/core';
import { Libro } from '../models/libro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private url: string;
  // private libros: Libro[];

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/libros';
    // this.libros = [];
    // // Para empezar con libros
    // this.libros.push(new Libro('Nunca', 'Tapa Dura', 'Ken Follet', 35, '../../../assets/img/libros/01.png', 203075));
    // this.libros.push(new Libro('Origen', 'Tapa Blanda', 'Dan Brown', 17, '../../../assets/img/libros/02.png', 387256));
    // this.libros.push(new Libro('El resplandor', 'Tapa Dura', 'Stephen King', 27, '../../../assets/img/libros/03.png', 847182));
    // this.libros.push(new Libro('Becas flacas', 'Tapa Blanda', 'Tom Sharpe', 14, '../../../assets/img/libros/04.png', 847182));
  }

  public getAll(): Observable<Object> {
    return this.http.get(this.url);
  }

  public getOne(id_libro: number): Observable<Object> {
    let urlId = this.url +'/?id=' + id_libro.toString();
    return this.http.get(urlId)
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

