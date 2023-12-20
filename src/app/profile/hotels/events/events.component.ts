import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventsService } from '../../../services/events/events.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  private jsonData = [
    {
      "id": 7,
      "title": "Tarragona Beach Hotel Christmas Gala",
      "description": "Join us for a festive gala by the beach with live music and a special Christmas dinner.",
      "imgUrl": "tarragona_beach_hotel_gala.jpg",
      "startDate": "2023-12-24",
      "endDate": "2023-12-24",
      "isPublic": false,
      "entryPrice": 75.0,
      "latitude": 41.1189,
      "longitude": 1.2445,
      "hotel": {
          "id": 1,
          "name": "Tarragona Beach Hotel",
          "description": "A beachfront hotel with stunning views of the Mediterranean.",
          "phone": "123456789",
          "address": "Passeig Marítim 1",
          "email": "info@tarragonabeachhotel.com",
          "web": "www.tarragonabeachhotel.com",
          "numberRooms": 80,
          "imgsUrl": "tarragona_beach_hotel1.jpg,tarragona_beach_hotel2.jpg",
          "price": 150.0,
          "latitude": 41.1189,
          "longitude": 1.2445,
          "hotelServices": [
              {
                  "id": 1,
                  "name": "SPA"
              },
              {
                  "id": 6,
                  "name": "Near the beach"
              },
              {
                  "id": 8,
                  "name": "Own activities"
              }
          ],
          "town": {
              "id": 1,
              "name": "Tarragona",
              "postalCode": "43001",
              "latitude": 41.1189,
              "longitude": 1.2445
          },
          "user": {
              "id": 20,
              "name": "Susanetta",
              "surname": "Stirley",
              "phone": "34687016590",
              "profImgUrl": null,
              "email": "sstirleyk@businesswire.com",
              "password": "$2a$04$UpVYECsbeCiAFv9o8NO8HOK/0h/48Q59sKDzTHB1m1ainaIIFzWfq",
              "registrationDate": "2023-12-14T18:14:03",
              "role": {
                  "id": 2,
                  "name": "HOTEL"
              }
          }
      }
  },
  {
    "id": 7,
    "title": "Tarragona Beach Hotel Christmas Gala",
    "description": "Join us for a festive gala by the beach with live music and a special Christmas dinner.",
    "imgUrl": "tarragona_beach_hotel_gala.jpg",
    "startDate": "2023-12-24",
    "endDate": "2023-12-24",
    "isPublic": false,
    "entryPrice": 75.0,
    "latitude": 41.1189,
    "longitude": 1.2445,
    "hotel": {
        "id": 1,
        "name": "Tarragona Beach Hotel",
        "description": "A beachfront hotel with stunning views of the Mediterranean.",
        "phone": "123456789",
        "address": "Passeig Marítim 1",
        "email": "info@tarragonabeachhotel.com",
        "web": "www.tarragonabeachhotel.com",
        "numberRooms": 80,
        "imgsUrl": "tarragona_beach_hotel1.jpg,tarragona_beach_hotel2.jpg",
        "price": 150.0,
        "latitude": 41.1189,
        "longitude": 1.2445,
        "hotelServices": [
            {
                "id": 1,
                "name": "SPA"
            },
            {
                "id": 6,
                "name": "Near the beach"
            },
            {
                "id": 8,
                "name": "Own activities"
            }
        ],
        "town": {
            "id": 1,
            "name": "Tarragona",
            "postalCode": "43001",
            "latitude": 41.1189,
            "longitude": 1.2445
        },
        "user": {
            "id": 20,
            "name": "Susanetta",
            "surname": "Stirley",
            "phone": "34687016590",
            "profImgUrl": null,
            "email": "sstirleyk@businesswire.com",
            "password": "$2a$04$UpVYECsbeCiAFv9o8NO8HOK/0h/48Q59sKDzTHB1m1ainaIIFzWfq",
            "registrationDate": "2023-12-14T18:14:03",
            "role": {
                "id": 2,
                "name": "HOTEL"
            }
        }
    }
}
  

  
];

  events: any = null;
  peticionEvents = false;

  constructor(private route: ActivatedRoute, private eventService: EventsService) { }

  ngOnInit(): void {
    this.events = this.jsonData;
    this.peticionEvents = true;
    console.log(this.events);
    //this.getEvents();
  }

  getEvents()
  {
    this.eventService.getEventByHotelId(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.peticionEvents = true;
        this.events = data;
      }
    )
  }

  eliminar(id: string): void {
    this.eventService.deleteEventById(id).subscribe({
      next: (data) => {
        this.getEvents();
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

}
