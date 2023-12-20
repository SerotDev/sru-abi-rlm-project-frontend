import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private baseAPI: string = 'https://sru-abi-rlm-project-backend-production.up.railway.app';

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
    let url = `${this.baseAPI}/api/hotels/?page=${page}&size=&${size}&`;
  
    // Check params to URL
    if (idTown !== "") url += `&${idTown}`;
    if (search !== "") url += `&${search}`;
    if (minStarRatingAvg !== "") url += `&${minStarRatingAvg}`;
    if (minNumberRooms !== "") url += `&${minNumberRooms}`;
    if (minPrice !== "") url += `&${minPrice}`;
    if (maxPrice !== "") url += `&${maxPrice}`;
    if (idServices !== "") url += `&${idServices}`;
  
    return this.http.get<object>(url);
  }
  
  getStarRating(idHotel: number) : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/hotel/starRatingAvg/&${idHotel}`);
  }

  getHotelId(idHotel: number) : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/hotel/&${idHotel}`);
  }

  addHotel(data : any) : Observable <object> {
    return this.http.post(`${this.baseAPI}/api/hotel/add`, data);
  }

  updateHotelById(id : any, data : any) : Observable <object> {
    return this.http.put(`${this.baseAPI}/api/hotel/update/&${id}`, data);
  }

  deleteHotelById(id : any) : Observable <object> {
    return this.http.delete(`${this.baseAPI}/api/hotel/delete/&${id}`);
  }
}  