import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>
  {
    return this.http.post(environment.apiUrl + '/login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any>
  {
    return this.http.post(environment.apiUrl + '/register', {
      username,
      password,
      email
    }, httpOptions);
  }

  getUsuario(usuario: string): Observable<any>
  {
    return this.http.get(environment.apiUrl + `/api/usuarios/${usuario}/`, httpOptions);
  }

  getUsuarioPorId(id : any)  : Observable <any> {
    return this.http.get(environment.apiUrl + `/usuarios/${id}/`, httpOptions);
  }

  deleteUsuario(id: any): Observable<any>
  { 
    return this.http.delete(environment.apiUrl + `/usuarios/${id}/`, httpOptions);
  }
  
  //edit user by id

  
  /*getRoles() : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/roles`);
  }*/
}