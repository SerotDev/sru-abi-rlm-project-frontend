import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseAPI = 'https://sru-abi-rlm-project-backend-production.up.railway.app';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http : HttpClient) { }

  getAllEvents() : Observable <object> {
    return this.http.get<object>(`${baseAPI}/api/events`);
  }

  getEventById(id : any) : Observable <object> {
    return this.http.get(`${baseAPI}/api/event/${id}`);
  }

  addEvent(data : any) : Observable <object> {
    return this.http.post(`${baseAPI}/api/event/add`, data);
  }

  updateEventById(id : any, data : any) : Observable <object> {
    return this.http.put(`${baseAPI}/api/event/update/${id}`, data);
  }

  deleteEventById(id : any) : Observable <object> {
    return this.http.delete(`${baseAPI}/api/event/delete/${id}`);
  }
}
