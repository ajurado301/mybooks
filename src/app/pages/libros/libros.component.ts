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

  constructor(private ls: LibrosService, private ns: NotificacionService) { 
    this.libros = [];                
    this.buscarLibro(null);
    this.libroAmodificar = new Libro(null, null, null, null, null, null)
  }

  ngOnInit(): void {
  }

  agregarLibro(titulo: string, tipo: string, autor: string, precio: number, foto: string): void {
    let libro = new Libro(titulo, tipo, autor, precio, foto);
    this.ls.add(libro)
    .subscribe((respuesta: any) => {
      if (respuesta.ok) {
        this.ns.mostrarSuccess(respuesta.message, 'Correcto');
        this.buscarLibro(null);
      } else {
        this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
      }
    }, (err) => {
      this.ns.mostrarError(err.error.message, 'Error');
    })
  }
  
  activarLibroAmodificar(libro: Libro): void {
    this.libroAmodificar = libro;
  }

  modificarLibro(titulo: string, tipo: string, autor: string, precio: number, foto: string, codigo: number): void {
    let libro = new Libro(titulo, tipo, autor, precio, foto, codigo);
    this.ls.edit(libro)
    .subscribe((respuesta: any) => {
      if (respuesta.ok) {
        this.ns.mostrarSuccess(respuesta.message, 'Correcto');
        this.buscarLibro(null);
        this.libroAmodificar = new Libro(null, null, null, null, null, null)
      } else {
        this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
      }
    }, (err) => {
      this.ns.mostrarError(err.error.message, 'Error');
    })
  }
  
  buscarLibro(id_libro: number): void {
    if(!id_libro) {
      this.ls.getAll()
      .subscribe((respuesta: any) => {
        if (respuesta.ok) {
          this.libros = respuesta.resultado;
          this.ns.mostrarSuccess(respuesta.message, 'Correcto');
        } else {
          this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
        }
      }, (err) => {
        this.ns.mostrarError(err.error.message, 'Error');
      })
    } else {
      this.ls.getOne(id_libro)
      .subscribe((respuesta: any) => {
        if (respuesta.ok) {
          this.libros = respuesta.resultado;
          this.ns.mostrarSuccess(respuesta.message, 'Correcto');
        } else {
          this.libros = [];
          this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
        }
      }, (err) => {
        this.ns.mostrarError(err.error.message, 'Error');
      })
    }
  }

  confirmarEliminar(id_libro: number): void {
    this.eliminar_id_libro = id_libro;
  }

  borrarLibro(id_libro: number): void {
    this.ls.delete(id_libro)
    .subscribe((respuesta: any) => {
      if (respuesta.ok) {
        this.ns.mostrarSuccess(respuesta.message, 'Correcto');
        this.buscarLibro(null);
      } else {
        this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
      }
    }, (err) => {
      this.ns.mostrarError(err.error.message, 'Error');
    })
  }
}
