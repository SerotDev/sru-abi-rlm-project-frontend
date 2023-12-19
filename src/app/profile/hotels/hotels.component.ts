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

  hoteles: any = null;
  peticionHoteles = false;

  constructor(private hotelService: HotelsService, private route : ActivatedRoute) { }

 ngOnInit(): void {
    const page = 1;
    const size = 10;
    const idTown = "";
    const search = "";
    const minStarRatingAvg = "";
    const minNumberRooms = "";
    const minPrice = "";
    const maxPrice = "";
    const idServices = "";

    this.hotelService.getFilteredHotels(page, size, idTown, search, minStarRatingAvg, minNumberRooms, minPrice, maxPrice, idServices).subscribe(
      data => {
        this.peticionHoteles = true;
        this.hoteles = data;
      }
    );
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
