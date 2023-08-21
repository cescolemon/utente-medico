import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeUtenteComponent } from './home-utente/home-utente.component';
import { HomeMedicoComponent } from './home-medico/home-medico.component';
import { AppUtenteComponent } from './app-utente/app-utente.component';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { AuthService } from './services/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogSuccesComponent } from './dialog-succes/dialog-succes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeUtenteComponent,
    HomeMedicoComponent,
    AppUtenteComponent,
    FooterComponent,
    RegistrazioneComponent,
    ErrorDialogComponent,
    DialogSuccesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
