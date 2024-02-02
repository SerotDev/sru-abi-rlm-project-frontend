import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel';
import { HotelsService } from '../services/hotels/hotels.service';
import { Town } from '../models/town';
import { Service } from '../models/service';
import { NoLoggedService } from '../services/no-logged.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  //hotels list results variables
  protected hotels: Hotel[] = [];
  protected totalItems: any;
  protected totalPages: any;
  protected currentPage: any;
  protected navPages: any = [];
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
  } = { page: 0, size: 6 };

  //filter results variables
  protected towns: Town[] = [];
  protected services: Service[] = [];
  protected selectedPage: any = "";
  protected selectedTown: any = "";
  protected selectedHotelNameSearch: any = "";
  protected selectedMinStarRatingAvg: any = "";
  protected selectedMinNumberRooms: any = "";
  protected selectedMinPrice: any = "";
  protected selectedMaxPrice: any = "";
  protected selectedServices: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private hotelsService: HotelsService, private serviceNoLogged: NoLoggedService) { }

  ngOnInit(): void {
    //HOTELS LIST
    //reset variables when reload
    this.route.queryParams.subscribe(params => {
      //get params from url
      this.searchParams.page = params['page'] ? params['page'] - 1 : 0;
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
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage;
          //calc pages navigation to show
          this.navPages = [];
          const numOfBtnsBetweenCurrentPage: number = 1 //1 left and 1 right
          const maxNumOfBtns: number = (numOfBtnsBetweenCurrentPage * 2) + 1
          //if the actual page range is in the start
          if ((this.currentPage - numOfBtnsBetweenCurrentPage) < 0) {
            let counter: number = 0;
            for (let i = this.currentPage; i < this.totalPages; i++) {
              if (counter < maxNumOfBtns) {
                this.navPages.push(i + 1);
              }
              counter++;
            }
          //if the actual page range is at the end and not at the start
          } else if((this.currentPage + numOfBtnsBetweenCurrentPage) >= this.totalPages){
            let counter: number = 0;
            if (this.currentPage - numOfBtnsBetweenCurrentPage - 1 >= 0) {
              for (let i = this.currentPage - numOfBtnsBetweenCurrentPage - 1; i < this.totalPages; i++) {
                if (counter < maxNumOfBtns) {
                  this.navPages.push(i + 1);
                }
                counter++;
              }
            } else {
              for (let i = 0; i < this.totalPages; i++) {
                if (counter < maxNumOfBtns) {
                  this.navPages.push(i + 1);
                }
                counter++;
              }
            }
          // if the actual page is not at the start and not at the end
          } else {
            let counter: number = 0;
            for (let i = this.currentPage - 1; i < this.totalPages; i++) {
              if (counter < maxNumOfBtns) {
                this.navPages.push(i + 1);
              }
              counter++;
            }
          }
          
          //get star rating average
          for (let i = 0; i < this.hotels.length; i++) {
            this.hotelsService.getStarRating(this.hotels[i].id).subscribe(responseAvg => {
              this.hotels[i].starRatingAvg = responseAvg;
            });
          }
          this.loaded = true;
          //if has no results of hotels
          if (this.hotels.length === 0) {
            this.haveNoResults = true;
          }
        }, error => {
          console.error('Error fetching hotels:', error);
        });

    });

    //FILTERS
    //get towns
    this.serviceNoLogged.getTowns().subscribe({
      next: (response: any) => {
        this.towns = response;
        //set the default value of the first town when data is loaded
      },
      error: (error: any) => {
        console.log("Error getting Towns:\n" + error);
      }
    });
    //get services
    this.serviceNoLogged.getServices().subscribe({
      next: (response: any) => {
        this.services = response;
      },
      error: (error: any) => {
        console.log("Error getting Hotel Services:\n" + error);
      }
    });
  }

  //functions to update param values on select or change some element in filters form
  onSelected(
    valuePage: number,
    valueTown: string,
    valueHotelNameSearch: string,
    valueMinStarRatingAvg: string,
    valueMinNumberRooms: string,
    valueMinPrice: string,
    valueMaxPrice: string
  ): void {
    this.selectedPage = valuePage;
    this.selectedTown = valueTown;
    this.selectedHotelNameSearch = valueHotelNameSearch;
    this.selectedMinStarRatingAvg = valueMinStarRatingAvg;
    this.selectedMinNumberRooms = valueMinNumberRooms;
    this.selectedMinPrice = valueMinPrice;
    this.selectedMaxPrice = valueMaxPrice;
  }

  //add or delete services checkbox in array depending if its selected or not
  onChangeCheckbox(valueCheckbox: any): void {
    if (this.selectedServices.includes(valueCheckbox)) {
      this.selectedServices = this.selectedServices.filter((item: any) => item !== valueCheckbox);
    } else {
      this.selectedServices.push(valueCheckbox);
    }
  }

  onSubmitFilters(): void {
    //refresh state
    this.haveNoResults = false;

    //check existent filters to add it into the filter params
    let filterParams: {
      page?: any,
      idTown?: any,
      search?: any,
      minStarRatingAvg?: any,
      minNumberRooms?: any,
      minPrice?: any,
      maxPrice?: any,
      idServices?: any
    } = {};

    //function to set params depending if its filled with something or not
    const setParams = (selectedValue: any, paramToSet: any, valueToExclude?: any) => {
      if (selectedValue !== undefined && selectedValue !== "" && selectedValue !== valueToExclude) {
        paramToSet = selectedValue;
      } else {
        paramToSet = undefined;
      }
      return paramToSet;
    }

    //set selected values in filter params object
    if (this.selectedPage !== undefined && this.selectedPage !== "") {
      filterParams['page'] = this.selectedPage;
    } else {
      filterParams['page'] = 1;
    }
    filterParams['idTown'] = setParams(this.selectedTown, filterParams['idTown']);
    filterParams['search'] = setParams(this.selectedHotelNameSearch, filterParams['search']);
    filterParams['minStarRatingAvg'] = setParams(this.selectedMinStarRatingAvg, filterParams['minStarRatingAvg'], "0");
    filterParams['minNumberRooms'] = setParams(this.selectedMinNumberRooms, filterParams['minNumberRooms']);
    filterParams['minPrice'] = setParams(this.selectedMinPrice, filterParams['minPrice']);
    filterParams['maxPrice'] = setParams(this.selectedMaxPrice, filterParams['maxPrice']);
    filterParams['idServices'] = setParams(this.selectedServices.join(","), filterParams['idServices']);

    //reload the page with updated params
    let queryParams: Params = filterParams;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }
  //https://sru-abi-rlm-project-backend-production.up.railway.app/api/hotels/%7Bpage%7D%7Bsize%7D%7BidTown%7D%7Bsearch%7D%7BminStarRatingAvg%7D%7BminNumberRooms%7D%7BminPrice%7D%7BmaxPrice%7D%7BidServices%7D?page=0&size=2&search=reus
  //encodeURIComponent(myUrl);
}