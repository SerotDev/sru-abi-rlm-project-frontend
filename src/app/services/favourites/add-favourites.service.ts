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
export class AddFavouritesService {

  constructor(private http : HttpClient) { }


  addFavourite(id : any) : Observable <object> {
    return this.http.post(`${environment.apiUrl}/api/addFavourite/add`, id, httpOptions);
  }

  //Review
  updateAddFavouriteById(id: any, starRating: any) : Observable <object> {
    return this.http.put(`${environment.apiUrl}/api/addFavourite/update/&${id}`, starRating, httpOptions);
  }

  deleteAddFavouriteById(id : any) : Observable <object> {
    return this.http.delete(`${environment.apiUrl}/api/addFavourite/delete/&${id}`, httpOptions);
  }

  getAddFavourites() : Observable <object> {
    return this.http.get<object>(`${environment.apiUrl}/api/addFavourites`, httpOptions);
  }

  getAddFavouriteById(idFavourite: number) : Observable <object>{
    return this.http.get<object>(`${environment.apiUrl}/api/addFavourite/&${idFavourite}`, httpOptions);
  }
}
