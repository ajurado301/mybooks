import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificacionService } from 'src/app/shared/notificacion.service';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Usuario } from '../../models/usuario';
import { FuncionesService } from '../../shared/funciones.service';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {
  
  public usuario: Usuario;

  constructor(private ns: NotificacionService,
              private us: UsuarioService,
              private router: Router,
              public fs: FuncionesService) {
    this.usuario = new Usuario(null, null, null, null, null);
    // TODO: Quitar, es solo para logueado autmático
    this.us.usuario = new Usuario('Ander', 'Jurado Rodríguez', 'ajurado301@gmail.com', '../../../assets/img/01.png', '', 1);
    this.us.logueado = true;
    this.router.navigate(['/libros'])
  }

  ngOnInit(): void {
  }

  login(): void {
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
