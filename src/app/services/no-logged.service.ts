import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedService {
  private baseAPI: string = 'https://sru-abi-rlm-project-backend-production.up.railway.app';

  constructor(private http : HttpClient) { }

  //Towns
  getTowns() : Observable <object> {
    return this.http.get<object>(`${this.baseAPI}/api/towns`);
  }
  getTownById(idTown: any) : Observable <object> {
    return this.http.get<object>(`${this.baseAPI}/api/town/&${idTown}`);
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

  
  //Rol
  getRoles() : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/roles`);
  }

  getRolById(idRol: any) : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/role/&${(idRol)}`);
  }

  //Service
  getHotelServices() : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/hotelServices`);
  }

  getHotelServiceById(idService : any) : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/hotelService/&${(idService)}`);
  }
}