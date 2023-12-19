import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseAPI = 'https://sru-abi-rlm-project-backend-production.up.railway.app';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

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
    // Construir la URL con los parámetros
    let url = `${baseAPI}/api/hotels/${page}/${size}`;
  
    // Agregar parámetros a la URL si están definidos
    if (idTown !== "") url += `/${idTown}`;
    if (search !== "") url += `/${search}`;
    if (minStarRatingAvg !== "") url += `/${minStarRatingAvg}`;
    if (minNumberRooms !== "") url += `/${minNumberRooms}`;
    if (minPrice !== "") url += `/${minPrice}`;
    if (maxPrice !== "") url += `/${maxPrice}`;
    if (idServices !== "") url += `/${idServices}`;
  
    // Convertir a HttpParams para agregar los parámetros de consulta
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    // Agregar parámetros de consulta a la URL
    url += '?' + params.toString();
  
    return this.http.get<object>(url);
  }
  
  

  getHotelbyId(id : any) : Observable <object> {
    return this.http.get(`${baseAPI}/api/hotel/${id}`);
  }

  getHotelbyStarRating(id : any) : Observable <object> {
    return this.http.get(`${baseAPI}/api/hotel/starRatingAvg/${id}`);
  }

  addHotel(data : any) : Observable <object> {
    return this.http.post(`${baseAPI}/api/hotel/add`, data);
  }

  updateHotelById(id : any, data : any) : Observable <object> {
    return this.http.put(`${baseAPI}/api/hotel/update/${id}`, data);
  }

  deleteHotelById(id : any) : Observable <object> {
    return this.http.delete(`${baseAPI}/api/hotel/delete/${id}`);
  }
}  