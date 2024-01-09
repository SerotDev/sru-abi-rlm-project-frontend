import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/auth/user.service'
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {
    username: '',
    password: ''
  };
  isLoggedIn = false;
  isLoggin = false;
  isLoginFailed = false;
  errorMessage = '';
  msg = '';
  rol: string | null = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    if(window.sessionStorage.getItem("auth-token"))
    {
      this.isLoggedIn = true;
      this.rol = window.sessionStorage.getItem("auth-rol");
      this.login.username = window.sessionStorage.getItem("auth-username");
    }
  }

  logUser(): void {
    this.isLoggin = true;
    this.userService.login(this.login.username, this.login.password)
    .subscribe({
      next: (response: any) => {
        window.sessionStorage.setItem("auth-token", response.token);
        window.sessionStorage.setItem("auth-username", response.username);
        window.sessionStorage.setItem("auth-rol", response.rol[0].authority);

        this.isLoginFailed = false;
        this.isLoggin = false;
        this.isLoggedIn = true;
        NavbarComponent.isLoggedIn = true;
        NavbarComponent.username = window.sessionStorage.getItem("auth-username");
      },
      error: (error: any) => {
        this.isLoggin = false;
        this.isLoginFailed = true;
        this.errorMessage = error.message;
      }
    });
  }
}