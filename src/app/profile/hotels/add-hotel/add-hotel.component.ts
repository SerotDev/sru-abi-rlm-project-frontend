import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelsService } from '../../../services/hotels/hotels.service';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent {

  hotel : any = {
    name : '', description : '', phone : '', address : '', email : '', web : '', number_rooms : '', imgs_url : '', price : '', latitude : '', longitude : '', town : ''
  };
  added = false;
  send = false;

  constructor(private hotelsServices : HotelsService) { }

  ngOnInit(): void {
  }

  saveHotelRegister() : void {
    this.send = true;
    const data = {
      name : this.hotel.name,
      description : this.hotel.description,
      phone : this.hotel.phone,
      address : this.hotel.address,
      email : this.hotel.email,
      web : this.hotel.web,
      number_rooms : this.hotel.number_rooms,
      imgs_url : this.hotel.imgs_url,
      price : this.hotel.price,
      latitude : this.hotel.latitude,
      longitude : this.hotel.longitude,
      town : this.hotel.town,
    };

    this.hotelsServices.addHotel(data)
    .subscribe({
      next: respuesta => {
        console.log(respuesta);
        this.added = true;
        this.send = false;
      },
      error: error => {
        console.log(error);
      }
    });
  
  }

  newHotelRegister() : void {
    this.added = false;
    this.hotel = {
      name : '', description : '', phone : '', address : '', email : '', web : '', number_rooms : '', imgs_url : '', price : '', latitude : '', longitude : '', town : ''
    }
  };

}
