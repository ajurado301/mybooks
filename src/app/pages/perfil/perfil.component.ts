import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../shared/usuario.service';
import { NotificacionService } from '../../shared/notificacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

    constructor(private ns: NotificacionService, public us: UsuarioService) { }

  ngOnInit(): void {
  }

  modificar(nombre: string, apellidos: string, correo: string, url: string, password: string) {
    let usuarioPerfil = new Usuario(nombre, apellidos, correo, url, (password == '') ? null : password, this.us.usuario.id_usuario);
    let mensaje = this.validarPerfilUsuario(usuarioPerfil);
    if (mensaje != '') {
      this.ns.mostrarwWarning(mensaje, 'Advertencia')
    } else {
      this.us.edit(usuarioPerfil)
        .subscribe((respuesta: any) => {
          if (respuesta.ok) {
            this.ns.mostrarSuccess(respuesta.message, 'Correcto');
            this.us.usuario = usuarioPerfil;
            this.us.usuario.password = '';
          } else {
            this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
          }
        }, (err) => {
          this.ns.mostrarError(err.error.message, 'Error');
        })
    }
  }

  validarPerfilUsuario(usuario: Usuario) : string {
    let result = '';
    let { nombre, correo } = usuario;
    result += (nombre == '') ? 'Nombre' : '';
    result += (correo == '' && result != '') ? ' / Correo' : (correo == '') ? 'Correo' : '';
    if (result != '') {
        result = 'Los siguientes campos son obligatorios: ' + result;
    }
    return result
  }

}
