import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../shared/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public libros: Libro[];

  constructor(private ls: LibrosService) { 
    this.libros = this.ls.getAll();
  }

  ngOnInit(): void {
  }

  agregarLibro(titulo: string, tipo: string, autor: string, precio: number, photo: string, codigo: number): void {
    let libro = new Libro(titulo, tipo, autor, precio, photo, codigo);
    this.ls.add(libro);
  }

  modificarLibro(titulo: string, tipo: string, autor: string, precio: number, photo: string, codigo: number): void {
    let libro = new Libro(titulo, tipo, autor, precio, photo, codigo);
    this.ls.edit(libro);
  }

  buscarLibro(id_libro: number): void {
    if(!id_libro) {
      this.libros = this.ls.getAll()
    } else {
      let libro: Libro = this.ls.getOne(id_libro);
      if (!libro) {
        this.libros = [];
      } else {
        this.libros = [libro]
      }
    }
  }
  borrarLibro(id_libro: number): void {
    this.ls.delete(id_libro);
    this.libros = this.ls.getAll();
  }
}
