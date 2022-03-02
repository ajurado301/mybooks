import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuarioPerfil : Usuario;
  public mensaje: string;
  public ocultarMensaje : boolean;
  public colorMensaje : string;

  constructor() { 
    this.usuarioPerfil = new Usuario('Ander', 'Jurado Rodríguez', 'ajurado301@gmail.com', '../../../assets/img/foto.jpg', 'P@ssw0rd', 0);
    this.ocultarMensaje = true;
  }

  ngOnInit(): void {
  }

  modificar(nombre: string, apellidos: string, correo: string, url: string, password: string) {
    let cambios: boolean = false;
    if (nombre) { this.usuarioPerfil.nombre = nombre; cambios = true };    
    if (apellidos) { this.usuarioPerfil.apellidos = apellidos; cambios = true };
    if (correo) { this.usuarioPerfil.correo = correo; cambios = true };
    if (url) { this.usuarioPerfil.url = url; cambios = true };
    if (password) { this.usuarioPerfil.password = password; cambios = true };
    this.ocultarMensaje = false;
    if (cambios) {
      this.mensaje = 'Usuario actualizado';
      this.colorMensaje = 'lightgreen'
    } else {
      this.mensaje = 'No se han detectado cambios';
      this.colorMensaje = 'red'
    }
  }
}
