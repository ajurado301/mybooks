import { Injectable } from '@angular/core';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private libros: Libro[];

  constructor() { 
    this.libros = [];
    // Para empezar con libros
    this.libros.push(new Libro('Nunca', 'Tapa Dura', 'Ken Follet', 35, '../../../assets/img/libros/01.png', 203075));
    this.libros.push(new Libro('Origen', 'Tapa Blanda', 'Dan Brown', 17, '../../../assets/img/libros/02.png', 387256));
    this.libros.push(new Libro('El resplandor', 'Tapa Dura', 'Stephen King', 27, '../../../assets/img/libros/03.png', 847182));
    this.libros.push(new Libro('Becas flacas', 'Tapa Blanda', 'Tom Sharpe', 14, '../../../assets/img/libros/04.png', 847182));
  }

  public getAll(): Libro[] {
    return this.libros;
  }

  public getOne(id_libro: number): Libro {
    let result: Libro = this.libros.find((libro) => { return libro.id_libro == id_libro })
    return (result) ? result : null;
  }

  public add(libro: Libro): void {
    this.libros.push(libro)
  }

  public edit(libro: Libro): boolean {
    let editado: boolean = false;
    let indice = this.libros.findIndex((libroIterado) => { return libroIterado.id_libro == libro.id_libro });
    if ( indice > -1) {
      this.libros[indice] = libro
      editado = true;
    }
    return editado;
  }

  public delete(id_libro: number): boolean {
    let borrado: boolean = false;
    let indice = this.libros.findIndex((libro) => { return libro.id_libro == id_libro });
    if ( indice > -1) {
      this.libros.splice(indice, 1);
      borrado = true;
    }
    return borrado
  }
}
