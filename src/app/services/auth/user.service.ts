import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from './token-storage.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

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

 /* getUser(username: any): Observable<any>
  {
    return this.http.get(environment.apiUrl + `/user/${username}/`, httpOptions);
  }*/

  getUserById(id : any)  : Observable <any> {
    let token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(environment.apiUrl + `/user/${id}/`, httpOptions);
  }

  deleteUser(id: any): Observable<any>
  { 
    return this.http.delete(environment.apiUrl + `/user/delete/${id}/`, httpOptions);
  }
  
  editUserById(id: any, updateData: any): Observable <any>{
    let token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(environment.apiUrl + id, updateData);
    
  }
  //edit user by id

  
  /*getRoles() : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/roles`);
  }*/
}