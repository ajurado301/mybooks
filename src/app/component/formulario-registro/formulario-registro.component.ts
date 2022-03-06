import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { NotificacionService } from '../../shared/notificacion.service';
import { UsuarioService } from '../../shared/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {

  constructor(private ns: NotificacionService,
              private us: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registro(nombre: string, apellidos: string, correo: string, url: string, password: string, password2: string): void {
    if (password != password2) {
      this.ns.mostrarError('Las contraseñas no coinciden', 'Error')
    } else {
      let usuarioRegistro: Usuario = new Usuario(nombre, apellidos, correo, url, password);
      let mensaje = this.validarUsuario(usuarioRegistro);
      if (mensaje != '') {
        this.ns.mostrarwWarning(mensaje, 'Advertencia')
      } else {
        this.us.register(usuarioRegistro)
          .subscribe((respuesta: any) => {
            this.ns.mostrarSuccess(respuesta.message, 'Correcto');
            this.us.usuario = usuarioRegistro;
            this.us.usuario.password = '';
            this.us.logueado = true;
            this.router.navigate(['/libros'])
          }, (err) => {
            this.ns.mostrarError(err.error.message, 'Error');
          })
      }
    }
  } 

  validarUsuario(usuario: Usuario) : string {
    let result = '';
    let { nombre, correo, password } = usuario;
    result += (nombre == '') ? 'Nombre' : '';
    result += (correo == '' && result != '') ? ' / Correo' : (correo == '') ? 'Correo' : '';
    result += (password == '' && result != '') ? ' / Contraseña' : (password == '') ? 'Contraseña' : '';
    if (result != '') {
        result = 'Los siguientes campos son obligatorios: ' + result;
    }
    return result
  }
}