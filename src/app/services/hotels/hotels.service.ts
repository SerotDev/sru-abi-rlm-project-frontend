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
    idTown?: number,
    search?: string,
    minStarRatingAvg?: number,
    minNumberRooms?: number,
    minPrice?: number,
    maxPrice?: number,
    idServices?: number[]
  ): Observable<any> {
    // URL with params
    let url = `${environment.apiUrl}/api/hotels/%7Bpage%7D%7Bsize%7D%7BidTown%7D%7Bsearch%7D%7BminStarRatingAvg%7D%7BminNumberRooms%7D%7BminPrice%7D%7BmaxPrice%7D%7BidServices%7D?page=${page}&size=${size}`;
  
    // Check params to URL
    if (idTown !== undefined) url += `&idTown=${idTown}`;
    if (search !== undefined) url += `&search=${encodeURIComponent(search)}`;
    if (minStarRatingAvg !== undefined) url += `&minStarRatingAvg=${minStarRatingAvg}`;
    if (minNumberRooms !== undefined) url += `&minNumberRooms=${minNumberRooms}`;
    if (minPrice !== undefined) url += `&minPrice=${minPrice}`;
    if (maxPrice !== undefined) url += `&maxPrice=${maxPrice}`;
    if (idServices !== undefined) url += `&idServices=${idServices}`;
  
    return this.http.get<any>(url);
  }
  
  getStarRating(idHotel: number) : Observable <object>{
    return this.http.get<object>(`${environment.apiUrl}/api/hotel/starRatingAvg/%7BhotelId%7D?hotelId=${idHotel}`, httpOptions);
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