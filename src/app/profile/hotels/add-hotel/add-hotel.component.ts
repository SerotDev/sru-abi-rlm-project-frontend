import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelsService } from '../../../services/hotels/hotels.service';
import { Service } from '../../../models/service';
import { Town } from '../../../models/town';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent implements OnInit {

  protected added = false;
  protected send = false;

  constructor(private hotelsServices: HotelsService) { }

  ngOnInit(): void {

    //data structure to create the hotel
    let hotelToCreate: {
      id: number,
      name: string,
      description: string,
      phone: string,
      address: string,
      email: string,
      web: string,
      numberRooms: number,
      imgsUrl: string,
      price: number,
      latitude: number,
      longitude: number,
      hotelServices: Service[];
      town: Town,
      user: any 
    } = {
      id: 0,
      name: '',
      description: '',
      phone: '',
      address: '',
      email: '',
      web: '',
      numberRooms: 0,
      imgsUrl: '',
      price: 0,
      latitude: 0,
      longitude: 0,
      hotelServices: [],
      town: {
        id: 0,
        name: '',
        postalCode: 0,
        latitude: 0,
        longitude: 0,
      },
      user: undefined
    };

    hotelToCreate.id = 2;

  }

}
