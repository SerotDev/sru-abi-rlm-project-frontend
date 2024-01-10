import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  getHotelbyUserId(arg0: string | null) {
    throw new Error('Method not implemented.');
  }
  constructor(private http : HttpClient) { }

  // CRUD HOTELES

  getFilteredHotels(
    page: number,
    size: number,
    idTown: number | string,
    search: string,
    minStarRatingAvg: number | string,
    minNumberRooms: number | string,
    minPrice: number | string,
    maxPrice: number | string,
    idServices: number[] | string
  ): Observable<object> {
    // URL with params
    let url = `${environment.apiUrl}/api/hotels/%7Bpage%7D%7Bsize%7D%7BidTown%7D%7Bsearch%7D%7BminStarRatingAvg%7D%7BminNumberRooms%7D%7BminPrice%7D%7BmaxPrice%7D%7BidServices%7D?page=${page}&size=&${size}&`;
  
    // Check params to URL
    if (idTown !== "") url += `&${idTown}`;
    if (search !== "") url += `&${encodeURIComponent(search)}`;
    if (minStarRatingAvg !== "") url += `&${minStarRatingAvg}`;
    if (minNumberRooms !== "") url += `&${minNumberRooms}`;
    if (minPrice !== "") url += `&${minPrice}`;
    if (maxPrice !== "") url += `&${maxPrice}`;
    if (idServices !== "") url += `&${idServices}`;
  
    return this.http.get<object>(url);
  }
  
  getStarRating(idHotel: number) : Observable <object>{
    return this.http.get<object>(`${environment.apiUrl}/api/hotel/starRatingAvg/&${idHotel}`, httpOptions);
  }

  getHotelById(idHotel: any) : Observable <any>{
    return this.http.get<any>(`${environment.apiUrl}/api/hotel/&${idHotel}`, httpOptions);
  }

  addHotel(data : any) : Observable <object> {
    return this.http.post(`${environment.apiUrl}/api/hotel/add`, data, httpOptions);
  }

  updateHotelById(id : any, data : any) : Observable <object> {
    return this.http.put(`${environment.apiUrl}/api/hotel/update/&${id}`, data, httpOptions);
  }

  deleteHotelById(id : any) : Observable <object> {
    return this.http.delete(`${environment.apiUrl}/api/hotel/delete/&${id}`, httpOptions);
  }


}  