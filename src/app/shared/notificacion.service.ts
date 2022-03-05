import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private toastr: ToastrService) { }

  mostrarSuccess(mensaje: string, titulo: string){
    this.toastr.success(mensaje, titulo)
  }

  mostrarError(mensaje: string, titulo: string){
    this.toastr.error(mensaje, titulo)
  }

  mostrarInfo(mensaje: string, titulo: string){
    this.toastr.info(mensaje, titulo)
  }

  mostrarwWarning(mensaje: string, titulo: string){
    this.toastr.warning(mensaje, titulo)
  }
}
