import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    })
  };
  private loginuri = `${environment.serverUrl}`;

  login(credentials: any): Observable<any> {
    
    return this.http.post(`${this.loginuri}/login`, credentials);
  }

 // Verifica se l'utente è autenticato
 isAuthenticated(): boolean {
  // Implementa la logica per verificare se l'utente è autenticato.
  // Puoi utilizzare il token JWT o altre informazioni di autenticazione.
  // Restituisci true se l'utente è autenticato, altrimenti false.
  const token = localStorage.getItem('jwtToken');
  return !!token; // Verifica se il token esiste
}
}
