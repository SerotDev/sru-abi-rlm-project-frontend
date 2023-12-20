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

    let url = `${baseAPI}/api/hotels`;
    
    const params = new HttpParams()
      .set('page', page != null ? page.toString() : "")
      .set('size', size != null ? size.toString() : "")
      .set('idTown', idTown != null ? idTown.toString() : "")
      .set('search', search != null ? search.toString() : "")
      .set('minStarRatingAvg', minStarRatingAvg != null ? minStarRatingAvg.toString() : "")
      .set('minNumberRooms', minNumberRooms != null ? minNumberRooms.toString() : "")
      .set('minPrice', minPrice != null ? minPrice.toString() : "")
      .set('maxPrice', maxPrice != null ? maxPrice.toString() : "")
      .set('idServices', idServices != null ? idServices.toString() : "");
  
    url += '?' + params.toString();
    console.log(url);
  
    return this.http.get<object>(url);
  }
  
  getMyHotles(id: number)
  {
    return this.http.get(`${baseAPI}/api/user/hoteles/${id}`);
  }

  getHotelbyId(id : any) : Observable <object> {
    return this.http.get(`${baseAPI}/api/hotel/${id}`);
  }

  getHotelbyUserId(id : any) : Observable <object> {
    return this.http.get(`${baseAPI}/api/user/hotels/${id}`);
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