import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HotelsService } from '../services/hotels/hotels.service';
import { Hotel } from '../models/hotel';
import { Event } from '../models/event';
import { EventsService } from '../services/events/events.service';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})

export class HotelComponent implements OnInit {
  protected hotel: Hotel = {} as Hotel;
  protected hotelId: any;
  protected starRatingAvg: number | undefined;
  protected privateEvents: Event[] = [];
  protected publicEvents: Event[] = [];
  protected privateEventsHaveResults: boolean = false;
  protected publicEventsHaveResults: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private hotelsService: HotelsService, private eventsService: EventsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //get hotel id from url
      this.hotelId = params.get('id');
      //call service of the hotels to get hotel data with star rating average
      this.hotelsService.getHotelById(this.hotelId).subscribe({
        next: (response: any) => {
          this.hotel = response;
          //get star rating average of the hotel
          this.hotelsService.getStarRating(this.hotel.id).subscribe(responseAvg => {
            this.hotel.starRatingAvg = responseAvg;
          });
          //get private events of the hotel
          this.eventsService.getEventsPrivateByIdHotel(this.hotelId).subscribe(resposePrivateEvents => {
            this.privateEvents = resposePrivateEvents;
            //check if have private events results
            if (this.privateEvents.length === 0 || this.privateEvents.length === undefined) {
              this.privateEventsHaveResults = false;
            } else{
              this.privateEventsHaveResults = true;
            }
          });
          //get private events of the hotel
          this.eventsService.getEventsPublicByIdTown(this.hotel.town.id).subscribe(resposePublicEvents => {
            this.publicEvents = resposePublicEvents;
            //check if have private events results
            if (this.publicEvents.length === 0 || this.publicEvents.length === undefined) {
              this.publicEventsHaveResults = false;
            } else{
              this.publicEventsHaveResults = true;
            }
          });
          //if cant get the hotel id redirect to not-found page
          if (this.hotel.id === undefined) {
            this.router.navigateByUrl('/not-found');
          }
        },
        error: (error: any) => {
          console.log("Error getting Hotels:\n" + error);
          this.router.navigateByUrl('/not-found');
        }
      });
      
 
    });
  }

}
