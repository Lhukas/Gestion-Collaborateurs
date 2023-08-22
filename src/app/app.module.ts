//Mettre l'application en francais
import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeComponent } from './employe/employe.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendrierEmployeComponent } from './calendrier-employe/calendrier-employe.component';
import { HttpClientModule } from '@angular/common/http';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { VueEnsembleComponent } from './vue-ensemble/vue-ensemble.component';
import { CalendarModule } from 'angular-calendar';



@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    ListEmployeComponent,
    EmployeComponent,
    CalendrierEmployeComponent,
    CollaborateursComponent,
    LoadingComponent,
    VueEnsembleComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    CalendarModule
  ],
  //FR
  providers: [{ provide : LOCALE_ID, useValue : 'fr-FR'}],
  //
  bootstrap: [AppComponent]
})
export class AppModule { 
  //FR
  constructor() {
    registerLocaleData(fr.default);
  }
}
