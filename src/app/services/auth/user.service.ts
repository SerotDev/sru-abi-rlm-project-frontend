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

  getUserById(id : any, token : any)  : Observable <any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = {headers:headers};
    return this.http.get<any>(`${environment.apiUrl}/api/user/${id}`, requestOptions);
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
    return this.http.put(`${environment.apiUrl}/api/user/update/&${id}`, updateData, httpOptions);
    
  }
  
  getHotelbyUserId(id: any, token: any): Observable <any> {
    //create header structure
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };

    //returns the result of the auth request
    return this.http.get<any>(`${environment.apiUrl}/api/user/hotels/${id}`, requestOptions);
  }
}