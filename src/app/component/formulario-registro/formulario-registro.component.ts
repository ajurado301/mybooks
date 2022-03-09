import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { NotificacionService } from '../../shared/notificacion.service';
import { UsuarioService } from '../../shared/usuario.service';
import { Router } from '@angular/router';
import { FuncionesService } from '../../shared/funciones.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {

  public usuario: Usuario;
  public password2: string;

  constructor(private ns: NotificacionService,
              private us: UsuarioService,
              private router: Router,
              public fs: FuncionesService) {
    this.usuario = new Usuario(null, null, null, null, null);
  }

  ngOnInit(): void {
  }

  registro(): void {
    if (this.usuario.password != this.password2) {
      this.ns.mostrarError('Las contraseñas no coinciden', 'Error')
    } else {
      this.us.register(this.usuario)
        .subscribe((respuesta: any) => {
          this.ns.mostrarSuccess(respuesta.message, 'Correcto');
          this.router.navigate(['/login'])
        }, (err) => {
          this.ns.mostrarError(err.error.message, 'Error');
        })
    }
  } 
}