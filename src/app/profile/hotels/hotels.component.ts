import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HotelsService } from '../../services/hotels/hotels.service';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent {

  hotels: any = null;
  peticionHoteles = false;
  user_id: number = 1;

  constructor(private hotelService: HotelsService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    //this.hotels = this.jsonData;
    this.peticionHoteles = true;
    console.log(this.hotels);
    this.getHotels();
  }

  getHotels()
  {
    this.hotelService.getHotelbyUserId(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.peticionHoteles = true;
        console.log(data);
        this.hotels = data;
      }
    )
  }
 /*
  hotel : any = {
    id : '',
    nombre : ''
  };
  recogidaDatos = false;
  actualizado = false;
  enviar = false;

  ngOnInit(): void {
    this.hotelService.getHotelbyId(this.route.snapshot.paramMap.get('id'))
    .subscribe(
      respuesta => {
        this.recogidaDatos = true;
        this.hotel = respuesta;
    });
  }*/

}
