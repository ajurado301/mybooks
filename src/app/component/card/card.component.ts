import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Libro } from 'src/app/models/libro';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() libro: Libro;
  @Input() even: boolean;
  @Output() eventoModificarLibro = new EventEmitter<Libro>();
  @Output() eventoEliminarLibro = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  activarLibroAmodificar(libro: Libro) {
    this.eventoModificarLibro.emit(libro)
  }

  confirmarEliminar(id_libro: number) {
    this.eventoEliminarLibro.emit(id_libro)
  }

}
