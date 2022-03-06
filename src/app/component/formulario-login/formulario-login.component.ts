import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificacionService } from 'src/app/shared/notificacion.service';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

  constructor(private ns: NotificacionService,
              private us: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(correo: string, password: string): void {
    if (!correo || !password) {
      this.ns.mostrarwWarning('Correo y contraseña obligatorio', 'Advertencia');
    } else {
      let usuarioLogin = new Usuario('','',correo,'',password);
      this.us.login(usuarioLogin)
      .subscribe((respuesta: any) => {
        if (respuesta.ok) {
          this.us.usuario = respuesta.resultado;
          this.us.usuario.password = '';
          this.us.logueado = true;
          this.ns.mostrarSuccess(respuesta.message, 'Correcto');
          this.router.navigate(['/libros'])
        } else {
          this.ns.mostrarwWarning(respuesta.message, 'Advertencia');
        }
      }, (err) => {
        this.ns.mostrarError(err.error.message, 'Error');
      })
    }
  }
}
