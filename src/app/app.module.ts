import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormularioRegistroComponent } from './component/formulario-registro/formulario-registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { RefPipe } from './pipes/ref.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegistroComponent,
    FormularioRegistroComponent,
    PerfilComponent,
    LibrosComponent,
    RefPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
