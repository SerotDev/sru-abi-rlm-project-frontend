import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelsService } from '../services/hotels/hotels.service';
import { Hotel } from '../models/hotel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';


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
  protected idHotel: any;
  protected loaded: boolean = false;

  protected searchParams: {
    page: number;
    size: number;
    idTown?: number;
    search?: string;
    minStarRatingAvg?: number;
    minNumberRooms?: number;
    minPrice?: number;
    maxPrice?: number;
    idServices?: string;
  } = { page: 1, size: 6 };

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchParams.page = params.get('page');
      let url: string = `${this.apiUrl}${this.pelicula_id}?api_key=${this.apiKey}`;

      this.http.get(url).subscribe(
        (result: any) => {
          this.pelicula = result;
          console.log(result);
          this.loaded = true;
        },
        error => {
          console.log("error", error);
        }
      );
    });
    this.serviceHotel.getFilteredHotels(page, size).subscribe({
      next: (response: any) => {
        this.towns = response;
        this.loaded = true;
        //set the default value of the first town when data is loaded
        this.selectedTown = this.towns[0].id;
      },
      error: (error: any) => {
        console.log("Error getting Towns:\n" + error);
      }
    });
  }

}
