import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent} from '../app/login/login.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HoHoHotel';
  private role: string | null = '';
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string | null;

  constructor () { }

  ngOnInit(): void
  {
    this.isLoggedIn = !!window.sessionStorage.getItem("auth-token");

    if(this.isLoggedIn)
    {
      this.username = window.sessionStorage.getItem("auth-username");
      this.role = window.sessionStorage.getItem("auth-rol");

      this.showAdminBoard = (this.role == 'ADMIN');
    }
  }

  logout(): void
  {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
