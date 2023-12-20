import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseAPI: string = 'https://sru-abi-rlm-project-backend-production.up.railway.app';


  constructor(private http : HttpClient) { }

  getAllEvents() : Observable <object> {
    return this.http.get<object>(`${this.baseAPI}/api/events`);
  }

  getEventById(idEvent : any) : Observable <object> {
    return this.http.get<object>(`${this.baseAPI}/api/event/&${idEvent}`);
  }

  getEventByHotelId(id : any) : Observable <object> {
    return this.http.get(`${this.baseAPI}/api/events-private/${id}`);
  }

  addEvent(data : any) : Observable <object> {
    return this.http.post(`${this.baseAPI}/api/event/add`, data);
  }

  updateEventById(id : any, data : any) : Observable <object> {
    return this.http.put(`${this.baseAPI}/api/event/update/&${id}`, data);
  }

  deleteEventById(id : any) : Observable <object> {
    return this.http.delete(`${this.baseAPI}/api/event/delete/${id}`);
  }

  getEventsPrivateByHotel(idHotel: number) : Observable <object>{
    return this.http.get<object>(`${this.baseAPI}/api/events-private/&${idHotel}`);
  }

  getEventsPublicByTown(idTown: number) : Observable <object>{
  return this.http.get<object>(`${this.baseAPI}/api/events-public/&${idTown}`);
  }
}
