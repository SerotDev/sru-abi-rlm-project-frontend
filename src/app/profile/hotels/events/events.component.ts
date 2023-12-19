import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
      "id": 1,
        "title": "Christmas Market in Tarragona",
        "description": "Explore the festive market with various stalls and holiday decorations.",
        "imgUrl": "img/christmas_market_tarragona.jpg",
        "startDate": "2023-12-15",
        "endDate": "2023-12-23",
        "isPublic": true,
        "entryPrice": 0.0,
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
        "id": 2,
        "title": "Reus Winter Festival",
        "description": "Join the winter festivities in Reus with live music, food, and entertainment.",
        "imgUrl": "img/winter_festival_reus.jpg",
        "startDate": "2023-12-10",
        "endDate": "2023-12-20",
        "isPublic": true,
        "entryPrice": 5.0,
        "latitude": 41.1544,
        "longitude": 1.1063,
        "hotel": {
            "id": 2,
            "name": "Reus Boutique Hotel",
            "description": "An intimate boutique hotel in the heart of Reus.",
            "phone": "987654321",
            "address": "Carrer Major 15",
            "email": "reservations@reusboutiquehotel.com",
            "web": "www.reusboutiquehotel.com",
            "numberRooms": 30,
            "imgsUrl": "reus_boutique_hotel1.jpg,reus_boutique_hotel2.jpg",
            "price": 120.0,
            "latitude": 41.1544,
            "longitude": 1.1063,
            "hotelServices": [
                {
                    "id": 3,
                    "name": "Gym"
                }
            ],
            "town": {
                "id": 2,
                "name": "Reus",
                "postalCode": "43201",
                "latitude": 41.1544,
                "longitude": 1.1063
            },
            "user": {
                "id": 21,
                "name": "Allistir",
                "surname": "Gaukrodge",
                "phone": "34698312296",
                "profImgUrl": null,
                "email": "agaukrodgel@sciencedirect.com",
                "password": "$2a$04$olrX8euXCjPGbGYhnVwMIu/.OcKkMnjTjwKXomRd2P84L3EYvvqRK",
                "registrationDate": "2023-12-14T18:14:03",
                "role": {
                    "id": 2,
                    "name": "HOTEL"
                }
            }
        }
    },
]

  events: any = null;
  peticionEvents = false;

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents()
  {
    this.eventService.getAllEvents().subscribe(
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
