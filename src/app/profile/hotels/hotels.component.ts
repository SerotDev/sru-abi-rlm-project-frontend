import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Hotel } from '../../models/hotel';
import { UserService } from '../../services/auth/user.service';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent implements OnInit {

  //hotels list results variables
  protected isLoggedIn: boolean = false;
  protected hotels: Hotel[] = [];
  protected haveNoResults: boolean = false;
  protected loaded: boolean = false;

  constructor(private userService: UserService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    // get user id and token data
    let token = window.sessionStorage.getItem("auth-token");
    let userId = window.sessionStorage.getItem("id");

    //makes the api data request
    this.userService.getHotelbyUserId(userId, token).subscribe({
      next: (response: any) => {
        this.hotels = response;
        this.loaded = true
        //if has no results of hotels
        if (this.hotels.length === 0) {
          this.haveNoResults = true;
        }
      },
      error: (error: any) => {
        console.log("Error getting My-Hotels:\n" + error);
      }
    });
  }
}
