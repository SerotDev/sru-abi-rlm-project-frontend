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
export class UserService {

  constructor(private http: HttpClient) { }

  login(usuario: string, pass_usuario: string): Observable<any>
  {
    return this.http.post(AUTH_API + 'login', {
      usuario,
      pass_usuario
    }, httpOptions);
  }

  getUsuario(usuario: string): Observable<any>
  {
    return this.http.get(AUTH_API + `usuarios/${usuario}/`, httpOptions);
  }

  getUsuarios(): Observable<any>
  {
    return this.http.get(AUTH_API + `usuarios/`, httpOptions);
  }

  ubicaUsuarioPorId(id : any)  : Observable <any> {
    return this.http.get(AUTH_API + `usuarios/${id}/`, httpOptions);
  }

  addUsuario(usuario: string, pass_usuario: string, email: string, rol: object): Observable<any>
  {
    return this.http.post(AUTH_API + `usuarios/`, {
      usuario,
      pass_usuario,
      email,
      rol
    }, httpOptions);
  }

  deleteUsuario(id: any): Observable<any>
  {
    return this.http.delete(AUTH_API + `usuarios/${id}/`, httpOptions);
  }
}