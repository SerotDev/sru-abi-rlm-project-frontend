import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventsService } from '../services/events/events.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})

export class EventComponent implements OnInit{
  protected event: Event = {} as Event;
  protected eventId: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private eventsService: EventsService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //get hotel id from url
      this.eventId = params.get('id');
      //call service of the events to get event data
      this.eventsService.getEventById(this.eventId).subscribe({
        next: (response: any) => {
          this.event = response;
          //if can not recive the event id redirect to not-found page
          if (this.event.id === undefined) {
            this.router.navigateByUrl('/not-found');
          }
        },
        error: (error: any) => {
          console.log("Error getting Event:\n" + error);
          this.router.navigateByUrl('/not-found');
        }
      });
    });
  }

}
