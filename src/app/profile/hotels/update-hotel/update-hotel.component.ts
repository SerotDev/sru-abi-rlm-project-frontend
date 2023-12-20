import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HotelsService } from '../../../services/hotels/hotels.service';

@Component({
  selector: 'app-update-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-hotel.component.html',
  styleUrl: './update-hotel.component.css'
})
export class UpdateHotelComponent {

  hotel : any = {
    name : '', description : '', phone : '', address : '', email : '', web : '', number_rooms : '', imgs_url : '', price : '', latitude : '', longitude : '', town : ''
  };
  recogidaDatos = false;
  actualizado = false;
  enviar = false;

  constructor(private hotelService : HotelsService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.hotelService.getHotelId(this.route.snapshot.paramMap.get('id'))
    .subscribe(
      respuesta => {
        this.recogidaDatos = true;
        this.hotel = respuesta;
    });
  }

  updateRegister(): void {
    this.enviar = true;
    const data = {
      id: this.hotel.id,
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
  
    this.hotelService.updateHotelById(data.id, data).subscribe({
      next: (response) => {
        this.actualizado = true;
        this.enviar = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
