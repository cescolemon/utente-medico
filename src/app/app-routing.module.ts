import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUtenteComponent } from './app-utente/app-utente.component';
import { HomeUtenteComponent } from './home-utente/home-utente.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeMedicoComponent } from './home-medico/home-medico.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';

const routes: Routes = [

  { path: '', component: RegistrazioneComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user', component: HomeUtenteComponent, canActivate: [AuthGuard],  data: { roles: ['ROLE_USER'] }},
  { path: 'user/appuntamenti', component: AppUtenteComponent,  canActivate: [AuthGuard], data: { roles: ['ROLE_USER'] } },
  { path: 'doctor', component: HomeMedicoComponent, canActivate: [AuthGuard],  data: { roles: ['ROLE_MEDICO'] }},
  { path: 'registrazione', component: RegistrazioneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
