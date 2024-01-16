import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelsService } from '../services/hotels/hotels.service';
import { Hotel } from '../models/hotel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})

export class HotelComponent implements OnInit {

  serviceHotel = inject(HotelsService);

  protected hotels: Hotel[] = [];
  protected hotel: Hotel = {} as Hotel;
  protected starRatingAvg: number | undefined;
  protected idHotel :any;
  protected loaded:boolean = false;

  protected searchParams: { 
    page: any,
    size: any,
    idTown?: any,
    search?: any,
    minStarRatingAvg?: any,
    minNumberRooms?: any,
    minPrice?: any,
    maxPrice?: any,
    idServices?: any
  } = {page: 1, size: 6};

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //get params from url
      this.searchParams.page = params.get('page');
      this.searchParams.size = params.get('size');
      this.searchParams.idTown = params.get('idTown');
      this.searchParams.search = params.get('search');
      this.searchParams.minStarRatingAvg = params.get('minStarRatingAvg');
      this.searchParams.minNumberRooms = params.get('minNumberRooms');
      this.searchParams.minPrice = params.get('minPrice');
      this.searchParams.maxPrice = params.get('maxPrice');
      this.searchParams.idServices = params.get('idServices');
      
      //call service of the hotels to get data
      this.serviceHotel.getFilteredHotels(this.searchParams.page, this.searchParams.size).subscribe({
        next: (response: any) => {
          this.hotels = response;
          this.loaded = true
        },
        error: (error: any) => {
          console.log("Error getting Towns:\n" + error);
        }
      });
      
 
    });
  }

}
