import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//importar material
import {MatToolbarModule} from   '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ContatoComponent } from './contato/contato.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//import service;
import {ContatoService} from './contato.service';

//http para requisições da api
import {HttpClientModule} from '@angular/common/http';
//formulários reativos
import { FormsModule } from '@angular/forms';
//formulários reativos
import { ReactiveFormsModule } from '@angular/forms';
//importar dialog

import {MatDialogModule} from '@angular/material/dialog';
import { DetalheContatoComponent } from './detalhe-contato/detalhe-contato.component';


@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    DetalheContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule, 
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [
    ContatoService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
