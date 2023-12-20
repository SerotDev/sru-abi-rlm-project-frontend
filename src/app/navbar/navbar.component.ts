import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public static isLoggedIn = false;
  public static showAdminBoard = false;
  public static username?: string | null;

  constructor () { }

  ngOnInit(): void
  {
    NavbarComponent.isLoggedIn = !!window.sessionStorage.getItem("auth-token");

    if(NavbarComponent.isLoggedIn)
    {
      NavbarComponent.username = window.sessionStorage.getItem("auth-username");

      NavbarComponent.showAdminBoard = (window.sessionStorage.getItem("auth-rol") == 'ADMIN');
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

  logout(): void
  {
    NavbarComponent.isLoggedIn = false;
    window.sessionStorage.clear();
  }
}
