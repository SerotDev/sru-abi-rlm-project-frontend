import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddFavouritesService {
  private baseAPI: string = 'https://sru-abi-rlm-project-backend-production.up.railway.app';

  constructor(private http : HttpClient) { }

  addFavourite(id : number) : Observable <object> {
    return this.http.post(`${this.baseAPI}/api/addFavourite/add`, id);
  }

  updateAddFavouriteById(id : number, idHotel : number) : Observable <object> {
    return this.http.put(`${this.baseAPI}/api/addFavourite/update/&${id}`, idHotel);
  }

  deleteAddFavouriteById(id : any) : Observable <object> {
    return this.http.delete(`${this.baseAPI}/api/addFavourite/delete/&${id}`);
  }

  getAddFavourites() : Observable <object> {
    return this.http.get<object>(`${this.baseAPI}/api/addFavourites`);
  }

  getAddFavouriteById(idFavourite: number) : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/addFavourite/&${idFavourite}`);
  }
}
