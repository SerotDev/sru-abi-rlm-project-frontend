import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../../models/hotel';
import { UserService } from '../../services/auth/user.service';
import { Town } from '../../models/town';
import { HotelsService } from '../../services/hotels/hotels.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent implements OnInit {

  //hotels list results variables
  protected haveNoResults: boolean = false;
  protected loaded: boolean = false;
  protected hotels: any[] = [];
  protected tableDataFormat: {
    id: any,
    imgUrl: any,
    town: any,
    name: any,
    phone: any,
    email: any,
    web: any,

  } = {
    id: "",
    imgUrl: "",
    town: "",
    name: "",
    phone: "",
    email: "",
    web: "",
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private userService: UserService, private hotelService: HotelsService) { }

  ngOnInit(): void {
    // get user id and token data
    let token = window.sessionStorage.getItem("auth-token");
    let userId = window.sessionStorage.getItem("id");

    //makes the api data request
    this.userService.getHotelbyUserId(userId, token).subscribe({
      next: (response: any) => {
        this.loaded = true
        console.log(JSON.stringify(response))

        // get all table data of the rows and added to the hotels
        for (let i = 0; i < response.length; i++) {
          //It creates a copy of the hotelsTableData
          let rowData = Object.assign({}, this.tableDataFormat);

          rowData.id = response[i].id;
          rowData.imgUrl = response[i].imgsUrl;
          let town: Town = {} as Town;
          town = response[i].town;
          if (town !== null) {
            rowData.town = town.name;
          }
          rowData.name = response[i].name;
          rowData.phone = response[i].phone;
          rowData.email = response[i].email;
          rowData.web = response[i].web;

          this.hotels.push(rowData);

        }
        
        //if has no results of hotels
        if (response.length === 0) {
          this.haveNoResults = true;
        }
      },
      error: (error: any) => {
        console.log("Error getting My-Hotels:\n" + JSON.stringify(error));
      }
    });
  }

  onDelete(hotelId: number, modalIndex: number): void {
    let token = window.sessionStorage.getItem("auth-token");
    this.hotelService.deleteHotelById(hotelId, token).subscribe({
      next: (response: any) => {
        console.log("hotel with id " + hotelId + " deleted succesfully.");

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/my-hotels"])});
      },
      error: (error: any) => {
        console.log("Error deleting hotel with id " + hotelId + ":\n" + JSON.stringify(error));
      }
    });
  }
}
