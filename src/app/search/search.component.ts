import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { Hotel } from '../models/hotel';
import { HotelsService } from '../services/hotels/hotels.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  protected hotels: Hotel[] = [];
  protected totalItems: any;
  protected totalPages: any;
  protected currentPage: any;
  protected hotel: Hotel = {} as Hotel;
  protected starRatingAvg: number | undefined;
  protected idHotel :any;
  protected haveNoResults: boolean = false;
  protected loaded: boolean = false;

  protected searchParams: { 
    page: any,
    size?: any,
    idTown?: any,
    search?: any,
    minStarRatingAvg?: any,
    minNumberRooms?: any,
    minPrice?: any,
    maxPrice?: any,
    idServices?: any
  } = {page: 0, size: 6};

  constructor(private route: ActivatedRoute, private http: HttpClient, private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //get params from url
      this.searchParams.page = params['page'] ? params['page'] - 1 : this.searchParams.page;
      this.searchParams.size = params['size'] ? params['size'] : this.searchParams.size;
      this.searchParams.idTown = params['idTown'];
      this.searchParams.search = params['search'];
      this.searchParams.minStarRatingAvg = params['minStarRatingAvg'];
      this.searchParams.minNumberRooms = params['minNumberRooms'];
      this.searchParams.minPrice = params['minPrice'];
      this.searchParams.maxPrice = params['maxPrice'];
      this.searchParams.idServices = params['idServices'];
      
      //call service of the hotels to get data
      this.hotelsService.getFilteredHotels(
        this.searchParams.page, 
        this.searchParams.size, 
        this.searchParams.idTown, 
        this.searchParams.search, 
        this.searchParams.minStarRatingAvg, 
        this.searchParams.minNumberRooms, 
        this.searchParams.minPrice, 
        this.searchParams.maxPrice, 
        this.searchParams.idServices)
      .subscribe(response => {
        this.hotels = response.Hotels;
        for (let i = 0; i < this.hotels.length; i++) {
          this.hotelsService.getStarRating(this.hotels[i].id).subscribe(responseAvg => {
            this.hotels[i].starRatingAvg = responseAvg;
          });
        }
        this.loaded = true;
        if (this.hotels.length === 0) {
          this.haveNoResults = true;
        }
      }, error => {
        console.error('Error fetching hotels:', error);
      });
      
    });
  }

  generateStarRating(starRatingAvg: number) {
    let starRatingTemplate = ""
    for (let i = 0; i < 5; i++) {
      if (starRatingAvg <= i) {
        starRatingTemplate += "<span class=\"fa fa-regular fa-star\"></span>";
      } else{
        starRatingTemplate += "<span class=\"fa fa-star\"></span>";
      }
    }
    return starRatingTemplate;
  };
  //https://sru-abi-rlm-project-backend-production.up.railway.app/api/hotels/%7Bpage%7D%7Bsize%7D%7BidTown%7D%7Bsearch%7D%7BminStarRatingAvg%7D%7BminNumberRooms%7D%7BminPrice%7D%7BmaxPrice%7D%7BidServices%7D?page=0&size=2&search=reus
  //encodeURIComponent(myUrl);
}
