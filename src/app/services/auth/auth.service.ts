import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User, UserReg } from '../../models/user';
import { Observable, catchError, of } from 'rxjs';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})

export class AuthService {


  private readonly urlProd = environment.apiUrl;
  private urlRegister = `${this.urlProd}/auth/register`;
  private urlLogin = `${this.urlProd}/auth/login`;

  http = inject(HttpClient);

  register(user : UserReg ): Observable<any>{
    return this.http.post(this.urlRegister, user, { headers: { 'Content-Type': 'application/json' } })
    .pipe(catchError(this.handleError<any>('login')));

  }

  login(user : User ): Observable<any>{
    return this.http.post(this.urlLogin, user, { headers: { 'Content-Type': 'application/json' } })
      .pipe(catchError(this.handleError<any>('login')));
   }

  private handleError<T>(operation = 'opearation',result?:T){
    return (error: any): Observable<T > => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...😕',
        text: error.error.message,
      })
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}