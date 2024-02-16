import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelsService } from '../../../services/hotels/hotels.service';
import { Service } from '../../../models/service';
import { Town } from '../../../models/town';
import { UserService } from '../../../services/auth/user.service';
import { NoLoggedService } from '../../../services/no-logged.service';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent implements OnInit {
  //declarate data to show in form
  protected towns: Town[] = [];
  protected townsLoaded: boolean = false;
  protected services: Service[] = [];
  protected servicesLoaded: boolean = false;
  protected selectedServices: any = [];
  protected submitted: boolean = false;
  protected hotelAdded: boolean = false;


  //declarate data structure to create the hotel
  protected hotelToCreate: {
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

  constructor(private hotelsServices: HotelsService, private userService: UserService, private serviceNoLogged: NoLoggedService) { }

  ngOnInit(): void {

    //get user id from session storage and add it to the hotel to create
    this.hotelToCreate.user = {id: window.sessionStorage.getItem("id")};

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

  }

  //add or delete services checkbox in array depending if its selected or not
  onChangeCheckbox(valueCheckbox: any): void {
    if (this.selectedServices.includes(valueCheckbox)) {
      this.selectedServices = this.selectedServices.filter((item: any) => item !== valueCheckbox);
    } else {
      this.selectedServices.push(valueCheckbox);
    }
  }

  nameSelected(selectedName: any): void {
    this.hotelToCreate.name = selectedName;
  }

  townSelected(townId: any): void {
    // finding the town whose id is same as selected
    this.hotelToCreate.town = this.towns.find(town => town.id === parseInt(townId));
  }

  emailSelected(selectedEmail: any): void {
    this.hotelToCreate.email = selectedEmail;
  }

  phoneSelected(selectedPhone: any): void {
    this.hotelToCreate.phone = selectedPhone;
  }

  numRoomsSelected(selectedNumRooms: any): void {
    this.hotelToCreate.numberRooms = parseInt(selectedNumRooms);
  }

  priceSelected(selectedPrice: any): void {
    this.hotelToCreate.price = parseInt(selectedPrice);
  }

  addressSelected(selectedAddress: any): void {
    this.hotelToCreate.address = selectedAddress;
  }

  latitudeSelected(selectedLatitude: any): void {
    this.hotelToCreate.latitude = parseFloat(selectedLatitude);
  }

  longitudeSelected(selectedLongitude: any): void {
    this.hotelToCreate.longitude = parseFloat(selectedLongitude);
  }

  webSelected(selectedWeb: any): void {
    this.hotelToCreate.web = selectedWeb;
  }

  descriptionSelected(selectedDescription: any): void {
    this.hotelToCreate.description = selectedDescription;
  }

  imgSelected(selectedImg: any): void {
    this.hotelToCreate.imgsUrl = selectedImg;
  }


  onSubmitFilters(): void {
    //view body data in console to check it
    //console.log(JSON.stringify(this.hotelToCreate));

    //get token
    let token = window.sessionStorage.getItem("auth-token");

    // Add the selected values to the add hotel request
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { title: 'Angular POST Request Example' };

    //it creates the hotel
    this.hotelsServices.addHotel(this.hotelToCreate, token).subscribe({
      next: (response: any) => {
        //console message to know if hotel is created or not
        if (response && response !== undefined) {
          console.log("New hotel with id " + response.id + " succesfully created.");
        } else{
          console.log("Can not create new hotel.");
        }

        // Save the id of the hotel created 
        let idHotelCreated = parseInt(response.id);

        // Get all selected services and add it to the hotel
        for (let i = 0; i < this.selectedServices.length; i++) {
          //body info and structure to add the service
          let bodyServiceToAdd = {
            hotel: {
              id: idHotelCreated
            },
            service: {
              id: this.services[i].id
            }
          }

          //it adds the service to the hotel
          this.hotelsServices.addHotelService(bodyServiceToAdd, token).subscribe({
            next: (response: any) => {
              if (response && response !== undefined) {
                console.log("Service with id " + this.services[i].id + " added correctly to the hotel.");
              } else{
                console.log("Can not add service with id " + this.services[i].id + " to the hotel.");
              }
            },
            error: (error: any) => {
              console.log("Error adding service wit id " + this.services[i].id + " to the hotel:\n" + JSON.stringify(error));
            }
          });

        }
      },
      error: (error: any) => {
        console.log("Error adding hotel:\n" + JSON.stringify(error));
      }
    });

    this.submitted = true;

  }



}
