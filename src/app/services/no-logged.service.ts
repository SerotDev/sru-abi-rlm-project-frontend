import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedService {

  constructor(private http : HttpClient) { }

  //Towns
  getTowns() : Observable <any> {
    return this.http.get<any>(`${environment.apiUrl}/api/towns`);
  }
  getTownById(idTown: any) : Observable <object> {
    return this.http.get<object>(`${environment.apiUrl}/api/town/&${idTown}`);
  }
 /* getHotelsByIdTown(idTown: number) : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/hotels?page=0&size=6&idTown=${idTown}`);
  }*/
  
  /*Map*/
  // getHotelsMap(parameters: string) : Observable <object>{
  //   let hotelListResults: any = this.http.get<object>(`${this.baseAPI}/api/hotels?page0&size=1${parameters}`);
  //   let hotelQttNum: number = hotelListResults["totalPages"]/*totalPages*/
  //   return this.http.get<object>(`${this.baseAPI}/api/hotels?page0&size=${hotelQttNum}${parameters}`);
  // }

  

  //Service
  getHotelServices() : Observable <object>{
    return this.http.get<object>(`${environment.apiUrl}/api/hotelServices`);
  }

  getHotelServiceById(idService : any) : Observable <object>{
    return this.http.get<object>(`${environment.apiUrl}/api/hotelService/&${(idService)}`);
  }
}