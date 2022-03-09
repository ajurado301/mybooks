import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor() { }

  public campoInvalido(control: FormControl): boolean {
    return (control.dirty || control.touched) && control.invalid
  }
}
