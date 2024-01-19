import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {


  constructor(private http : HttpClient) { }

  getAllEvents() : Observable <object> {
    return this.http.get<object>(`${environment.apiUrl}/api/events`);
  }

  getEventById(idEvent : any) : Observable <any> {
    return this.http.get<any>(`${environment.apiUrl}/api/event/${idEvent}`);
  }

  getEventByHotelId(id : any) : Observable <any> {
    return this.http.get(`${environment.apiUrl}/api/events-private/${id}`);
  }

  addEvent(data : any) : Observable <any> {
    return this.http.post(`${environment.apiUrl}/api/event/add`, data);
  }

  updateEventById(id : any, data : any) : Observable <any> {
    return this.http.put(`${environment.apiUrl}/api/event/update/${id}`, data);
  }

  deleteEventById(id : any) : Observable <any> {
    return this.http.delete(`${environment.apiUrl}/api/event/delete/${id}`);
  }

  getEventsPrivateByIdHotel(idHotel: number) : Observable <any>{
    return this.http.get<any>(`${environment.apiUrl}/api/events-private/${idHotel}`);
  }

  getEventsPublicByIdTown(idTown: number) : Observable <any>{
    return this.http.get<any>(`${environment.apiUrl}/api/events-public/${idTown}`);
  }
}
