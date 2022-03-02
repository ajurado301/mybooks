import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public libros: Libro[];

  constructor() { 
    this.libros = [];

    // Para empezar con libros
    this.libros.push(new Libro('Nunca', 'Tapa dura', 'Ken Follet', 35, '../../../assets/img/libros/nunca.png', 203075));
    this.libros.push(new Libro('Origen', 'Tapa blanda', 'Dan Brown', 17, '../../../assets/img/libros/origen.png', 387256));
    this.libros.push(new Libro('El resplandor', 'Tapa dura', 'Stephen King', 27, '../../../assets/img/libros/resplandor.png', 847182));
  }

  ngOnInit(): void {
  }

  agregarLibro(titulo: string, tipo: string, autor: string, precio: number, photo: string, codigo: number) {
    let nuevoLibro = new Libro(titulo, tipo, autor, precio, photo, codigo);
    this.libros.push(nuevoLibro)
  }
}
