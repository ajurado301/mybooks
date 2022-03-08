import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../shared/libros.service';
import { NotificacionService } from '../../shared/notificacion.service';
import { UsuarioService } from '../../shared/usuario.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public libros: Libro[];
  public eliminar_id_libro: number;
  public libroAagregar: Libro;
  public libroAmodificar: Libro;

  constructor(private ls: LibrosService, private ns: NotificacionService, private us: UsuarioService) { 
    this.libros = [];                
    this.buscarLibro(null);
    this.libroAmodificar = new Libro(null, '', null, null, null, null);
    this.libroAagregar = new Libro(null, '', null, null, null, null);
  }
  
  ngOnInit(): void {
  }
  
  agregarLibro(): void {
    this.libroAagregar.id_usuario = this.us.usuario.id_usuario;
    this.ls.add(this.libroAagregar)
    .subscribe((respuesta: any) => {
      if (respuesta.ok) {
        this.libroAagregar.id_libro = respuesta.resultado.id_libro;
        this.libros.push(this.libroAagregar);
        this.ns.mostrarSuccess(respuesta.message, 'Correcto');
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

  modificarLibro(): void {
    this.ls.edit(this.libroAmodificar)
    .subscribe((respuesta: any) => {
      if (respuesta.ok) {
        this.ns.mostrarSuccess(respuesta.message, 'Correcto');
        let indice = this.libros.findIndex((itemLibro) => { return  itemLibro.id_libro == this.libroAmodificar.id_libro });
        this.libros[indice] = this.libroAmodificar;
      } else {
        this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
      }
    }, (err) => {
      this.ns.mostrarError(err.error.message, 'Error');
    })
  }

  buscarLibroIntro(tecla: number, id_libro: number): void {
    if (tecla == 13) {
      this.buscarLibro(id_libro);
    }
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
        let indice = this.libros.findIndex((itemLibro) => { return itemLibro.id_libro == id_libro });
        this.libros.splice(indice, 1);
      } else {
        this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
      }
    }, (err) => {
      this.ns.mostrarError(err.error.message, 'Error');
    })
  }
}
