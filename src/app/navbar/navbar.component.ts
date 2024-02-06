import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  //variables declarations
  public static isLoggedIn = false;
  public static username?: string | null;
  public static canViewMyHotels = false;
  public static canViewFavourites = false;

  constructor () { }

  ngOnInit(): void {
    NavbarComponent.isLoggedIn = !!window.sessionStorage.getItem("auth-token");
    if(NavbarComponent.isLoggedIn) {
      NavbarComponent.username = window.sessionStorage.getItem("auth-username");
    }

    //Validate the rol of the user to know what to show
    if (window.sessionStorage.getItem('auth-rol') === 'VISITOR' || window.sessionStorage.getItem('auth-rol') === 'ADMIN') {
      NavbarComponent.canViewFavourites = true;
    } else {
      NavbarComponent.canViewFavourites = false;
    }
    if (window.sessionStorage.getItem('auth-rol') === 'HOTEL' || window.sessionStorage.getItem('auth-rol') === 'ADMIN') {
      NavbarComponent.canViewMyHotels = true;
    } else {
      NavbarComponent.canViewMyHotels = false;
    }
  }

  get isLogged()
  {
    return NavbarComponent.isLoggedIn;
  }

  get username()
  {
    return NavbarComponent.username;
  }

  get canViewMyHotels() {
    if (window.sessionStorage.getItem('auth-rol') === 'HOTEL' || window.sessionStorage.getItem('auth-rol') === 'ADMIN') {
      NavbarComponent.canViewMyHotels = true;
    } else {
      NavbarComponent.canViewMyHotels = false;
    }
    return NavbarComponent.canViewMyHotels;
  }

  get canViewFavourites() {
    if (window.sessionStorage.getItem('auth-rol') === 'VISITOR' || window.sessionStorage.getItem('auth-rol') === 'ADMIN') {
      NavbarComponent.canViewFavourites = true;
    } else {
      NavbarComponent.canViewFavourites = false;
    }
    return NavbarComponent.canViewFavourites;
  }

  logout(): void
  {
    NavbarComponent.isLoggedIn = false;
    window.sessionStorage.clear();
  }
}
