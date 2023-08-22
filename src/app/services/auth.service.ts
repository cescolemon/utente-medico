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

  getUserRole(): string {
    const role = localStorage.getItem('authorities');
    return role!;
  }

 isAuthenticated(): boolean {
  const token = localStorage.getItem('jwtToken');
  return !!token; 
}
}
