import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../shared/libros.service';
import { NotificacionService } from '../../shared/notificacion.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public libros: Libro[];
  public eliminar_id_libro: number;
  public libroAmodificar: Libro;

  constructor(private ls: LibrosService,
              private ns: NotificacionService) { 
    this.libros = this.ls.getAll();
    this.libroAmodificar = new Libro(null, null, null, null, null, null)
  }

  ngOnInit(): void {
  }

  agregarLibro(titulo: string, tipo: string, autor: string, precio: number, photo: string, codigo: number): void {
    let libro = new Libro(titulo, tipo, autor, precio, photo, codigo);
    this.ls.add(libro);
    this.ns.mostrarSuccess(`Libro con id ${codigo} agregado`,'AGREGAR');
  }
  
  activarLibroAmodificar(libro: Libro): void {
    this.libroAmodificar = libro;
  }

  modificarLibro(titulo: string, tipo: string, autor: string, precio: number, photo: string, codigo: number): void {
    let libro = new Libro(titulo, tipo, autor, precio, photo, codigo);
    if (this.ls.edit(libro)) {
      this.ns.mostrarSuccess(`Libro con id ${codigo} modificado`,'MODIFICAR');
    } else {
      this.ns.mostrarwWarning(`Libro con id ${codigo} no encontrado`,'MODIFICAR');
    };
  }
  
  buscarLibro(id_libro: number): void {
    if(!id_libro) {
      this.libros = this.ls.getAll()
      this.ns.mostrarSuccess('Listando todos los libros','LISTAR');
    } else {
      let libro: Libro = this.ls.getOne(id_libro);
      if (!libro) {
        this.libros = [];
        this.ns.mostrarwWarning(`Libro con id ${id_libro} no encontrado`,'BUSCAR');
      } else {
        this.libros = [libro]
        this.ns.mostrarSuccess(`Mostrando libro con id ${id_libro}`,'BUSCAR');
      }
    }
  }

  confirmarEliminar(id_libro: number): void {
    this.eliminar_id_libro = id_libro;
  }

  borrarLibro(id_libro: number): void {
    if (this.ls.delete(id_libro)) {
      this.libros = this.ls.getAll();
      this.ns.mostrarSuccess(`Libro con id ${id_libro} eliminado`,'ELIMINAR');
    } else {
      this.ns.mostrarError(`Error al eliminar libro con id ${id_libro}`,'ELIMINAR');
    };
  }
}
