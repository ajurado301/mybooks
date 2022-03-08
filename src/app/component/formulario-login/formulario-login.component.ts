import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
  public usuario: Usuario;

  constructor(private ns: NotificacionService,
              private us: UsuarioService,
              private router: Router) {
    this.usuario = new Usuario(null, null, null, null, null);
  }

  ngOnInit(): void {
  }

  login(loginForm: NgForm): void {
    this.usuario=loginForm.value;
    this.us.login(this.usuario)
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
