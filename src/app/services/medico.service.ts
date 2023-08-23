import { Injectable } from '@angular/core';
import { Mservice } from '../interfaces/mservice';
import { Observable, catchError, map, of } from 'rxjs';
import { Appuntamento } from '../model/appuntamento';
import { Medico } from '../model/medico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicoService implements Mservice {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    })
  };
  private medicouri = `${environment.serverUrl}/doctor`;

  constructor(private http: HttpClient) { }
  registerMedico(med: Medico): Observable<any> {
    return this.http.post<Medico>(this.medicouri + '/register', med, { responseType: 'text' as 'json'});
  }
  getAllAppuntamentiMedico(id_medico: string): Observable<any> {
    return this.http.get(`${this.medicouri}/appuntamenti?id_medico=${id_medico}`).pipe(
      map((response: any) => {
        const appuntamenti = response;
        return appuntamenti;
      }),
      catchError(error => {
        return of([]);
      })
    );
  }
}
