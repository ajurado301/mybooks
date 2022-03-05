import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public us: UsuarioService) { }

  ngOnInit(): void {
  }

  logout() {
    this.us.logueado = false;
  }
}
