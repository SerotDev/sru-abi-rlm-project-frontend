import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsService } from '../../../services/hotels/hotels.service';
import { HttpClient } from '@angular/common/http';
import { NoLoggedService } from '../../../services/no-logged.service';
import { Hotel } from '../../../models/hotel';
import { UserService } from '../../../services/auth/user.service';
import { Town } from '../../../models/town';
import { Service } from '../../../models/service';

@Component({
  selector: 'app-update-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-hotel.component.html',
  styleUrl: './update-hotel.component.css'
})
export class UpdateHotelComponent {

  protected hotel: Hotel = {} as Hotel;
  protected hotelId: number = 0;
  protected loaded: boolean = false;
  protected towns: Town[] = [];
  protected townsLoaded: boolean = false;
  protected services: Service[] = [];
  protected servicesWithCheckStatus: any[] = [];
  protected servicesLoaded: boolean = false;
  protected iterationServicesChecked: boolean = false;
  protected selectedServices: any = [];

  //declarate data structure to create the hotel
  protected hotelToUpdate: {
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
    town: Town | undefined,
    user: any
  } = {
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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private userService: UserService, private hotelService: HotelsService, private serviceNoLogged: NoLoggedService) { }

  ngOnInit(): void {
        //Data to the form
    //get towns
    this.serviceNoLogged.getTowns().subscribe({
      next: (response: any) => {
        this.towns = response;
        this.townsLoaded = true;
        //add the first town id to selected town
        this.townSelected(this.towns[0].id)
      },
      error: (error: any) => {
        console.log("Error getting Towns:\n" + error);
      }
    });
    //get services
    this.serviceNoLogged.getServices().subscribe({
      next: (response: any) => {
        this.services = response;
        this.servicesLoaded = true;
      },
      error: (error: any) => {
        console.log("Error getting Hotel Services:\n" + error);
      }
    });

    // get user id and token data
    let token = window.sessionStorage.getItem("auth-token");
    let userId = window.sessionStorage.getItem("id");

    // get param of the hotel index
    const myHotelIndex = parseInt(this.route.snapshot.paramMap.get('index') + "");

    //get list of hotels and save the hotel id correspondent to the index
    this.userService.getHotelbyUserId(userId, token).subscribe({
      next: (response: any) => {
        console.log("Hotels found: " + JSON.stringify(response)); //dev message
        //if have response and is not empty
        if (response && response != "") {
          // get all table data of the rows and add compare he index with the url param to save the hotel id
          for (let i = 0; i < response.length; i++) {
            console.log("response index: " + i + " - param index: " + myHotelIndex);
            console.log("Hotel id: " + response[i].id);
            if (i === myHotelIndex) {
              this.hotelId = response[i].id;
              i = response.length;
            }
          }

          //call service of the hotels to get hotel data with star rating average
          this.hotelService.getHotelById(this.hotelId).subscribe({
            next: (response: any) => {
              this.loaded = true;
              this.hotel = response;
              //get star rating average of the hotel
              this.hotelService.getStarRating(this.hotel.id).subscribe(responseAvg => {
                this.hotel.starRatingAvg = responseAvg;
              });

              //set the checked status of the services
              let servicesToCheck = response.hotelServices;
              for (let i = 0; i < this.services.length; i++) {
                let isServiceChecked = false;
                for (let j = 0; j < this.hotel.hotelServices.length; j++) {
                  if (this.hotel.hotelServices[j].id === this.services[i].id) {
                    isServiceChecked = true;
                    this.selectedServices.push(this.services[i].id); //add the selected service ids to the list to capture clicks
                    j = this.hotel.hotelServices.length;
                  }
                }

                this.servicesWithCheckStatus.push({
                  id: this.services[i].id,
                  name: this.services[i].name,
                  checked: isServiceChecked
                });
              }

            },
            error: (error: any) => {
              console.log("Error getting Hotel with id " + this.hotelId + ":\n" + JSON.stringify(error));
              this.router.navigateByUrl('/my-hotels');
            }
          });
        }
      },
      error: (error: any) => {
        console.log("Error getting hotels to get index coincidence :\n" + JSON.stringify(error));
        this.router.navigateByUrl('/my-hotels');
      }
    });

  }

  //add or delete services checkbox in array depending if its selected or not
  onChangeCheckbox(valueCheckbox: any): void {
    if (this.selectedServices.includes(valueCheckbox)) {
      this.selectedServices = this.selectedServices.filter((item: any) => item !== valueCheckbox);
    } else {
      this.selectedServices.push(valueCheckbox);
    }
    console.log("Checkbox status: " + JSON.stringify(this.selectedServices));
  }

  nameSelected(selectedName: any): void {
    this.hotelToUpdate.name = selectedName;
  }

  townSelected(townId: any): void {
    // finding the town whose id is same as selected
    this.hotelToUpdate.town = this.towns.find(town => town.id === parseInt(townId));
  }

  emailSelected(selectedEmail: any): void {
    this.hotelToUpdate.email = selectedEmail;
  }

  phoneSelected(selectedPhone: any): void {
    this.hotelToUpdate.phone = selectedPhone;
  }

  numRoomsSelected(selectedNumRooms: any): void {
    this.hotelToUpdate.numberRooms = parseInt(selectedNumRooms);
  }

  priceSelected(selectedPrice: any): void {
    this.hotelToUpdate.price = parseInt(selectedPrice);
  }

  addressSelected(selectedAddress: any): void {
    this.hotelToUpdate.address = selectedAddress;
  }

  latitudeSelected(selectedLatitude: any): void {
    this.hotelToUpdate.latitude = parseFloat(selectedLatitude);
  }

  longitudeSelected(selectedLongitude: any): void {
    this.hotelToUpdate.longitude = parseFloat(selectedLongitude);
  }

  webSelected(selectedWeb: any): void {
    this.hotelToUpdate.web = selectedWeb;
  }

  descriptionSelected(selectedDescription: any): void {
    this.hotelToUpdate.description = selectedDescription;
  }

  imgSelected(selectedImg: any): void {
    this.hotelToUpdate.imgsUrl = selectedImg;
  }


  onSubmitFilters(): void {
    //view body data in console to check it
    //console.log(JSON.stringify(this.hotelToUpdate));

    //get token
    let token = window.sessionStorage.getItem("auth-token");

    // Add the selected values to the add hotel request
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { title: 'Angular POST Request Example' };

    

  }

}
