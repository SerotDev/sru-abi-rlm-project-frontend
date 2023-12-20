import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'https://sru-abi-rlm-project-backend-production.up.railway.app/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>
  {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any>
  {
    return this.http.post(AUTH_API + 'register', {
      username,
      password,
      email
    }, httpOptions);
  }

  getUsuario(usuario: string): Observable<any>
  {
    return this.http.get(AUTH_API + `api/usuarios/${usuario}/`, httpOptions);
  }

  getUsuarios(): Observable<any>
  {
    return this.http.get(AUTH_API + `usuarios/`, httpOptions);
  }

  getUsuarioPorId(id : any)  : Observable <any> {
    return this.http.get(AUTH_API + `usuarios/${id}/`, httpOptions);
  }

  deleteUsuario(id: any): Observable<any>
  {
    return this.http.delete(AUTH_API + `usuarios/${id}/`, httpOptions);
  }
}