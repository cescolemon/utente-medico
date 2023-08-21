import { Injectable } from '@angular/core';
import { Uservice } from '../interfaces/uservice';
import { Observable } from 'rxjs';
import { Appuntamento } from '../model/appuntamento';
import { Utente } from '../model/utente';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Medico } from '../model/medico';

@Injectable({
  providedIn: 'root'
})

export class UtenteService implements Uservice {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    })
  };
  private utenteuri = `${environment.serverUrl}/user`;

  constructor(private http: HttpClient) { }

  registerUtente(ut: Utente): Observable<any> {
    return this.http.post<any>(this.utenteuri + '/register', ut, { responseType: 'text' as 'json'});
  }
  getAllAppuntamentiUtente(id_utente: string): Observable<Appuntamento[]> {
    const url = `${this.utenteuri}/appuntamenti?id_utente=`+id_utente;
    return this.http.get<Appuntamento[]>(url);
  }
  registerAppuntamento(id_utente: string, id_medico: string, data: string): Observable<any> {
    const url = `${this.utenteuri}/prenotazione?id_utente=`+id_utente+`&id_medico=`+id_medico+`&data=`+data;
    return this.http.post(url, null);
  }
  deleteAppuntamento(id_appuntamento: number): Observable<any> {
    const url = `${this.utenteuri}/${id_appuntamento}`;
    return this.http.delete(url);
  }

  getAllMedici(): Observable<Medico[]> {
    const url = `${this.utenteuri}/medici`;
    return this.http.get<Medico[]>(url);
  }

}
