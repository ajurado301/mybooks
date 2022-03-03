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
    this.libros.push(new Libro('Nunca', 'Tapa dura', 'Ken Follet', 35, '../../../assets/img/libros/nunca.png', 203075));
    this.libros.push(new Libro('Origen', 'Tapa blanda', 'Dan Brown', 17, '../../../assets/img/libros/origen.png', 387256));
    this.libros.push(new Libro('El resplandor', 'Tapa dura', 'Stephen King', 27, '../../../assets/img/libros/resplandor.png', 847182));
  }

  public getAll(): Libro[] {
    return this.libros;
  }

  public getOne(id_libro: number): Libro {
    let result: Libro = null;
    let encontrado: boolean = false;
    let i: number = 0;
    while (i < this.libros.length && !encontrado) {
      if (this.libros[i].id_libro == id_libro) {
        result = this.libros[i];
        encontrado = true;
      }
      i++;
    };
    return result
  }

  public add(libro: Libro): void {
    this.libros.push(libro)
  }

  public edit(libro: Libro): boolean {
    let editado: boolean = false;
    let i: number = 0;
    while (i < this.libros.length && !editado) {
      if (this.libros[i].id_libro == libro.id_libro) {
        this.libros[i] = libro
        editado = true;
      }
      i++;
    }
    return editado;
  }

  public delete(id_libro: number): boolean {
    let borrado: boolean = false;
    let i: number = 0;
    while (i < this.libros.length && !borrado) {
      if (this.libros[i].id_libro == id_libro) {
        this.libros.splice(i, 1);
        borrado = true;
      }
      i++;
    }
    return borrado;
  }
}
