import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/auth/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  constructor(private userService: UsersService) { }

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
        window.sessionStorage.setItem("auth-rol", response.rol.authority);

        this.isLoginFailed = false;
        this.isLoggin = false;
        this.isLoggedIn = true;
      },
      error: (error: any) => {
        this.isLoggin = false;
        this.isLoginFailed = true;
        if ("Http failure response for https://reserva-restaurant-fe-jai.herokuapp.com/login: 403 OK" == error.message) {
          this.errorMessage = 'Usuario y/o Contraseña Incorrectos';
        }
        else
        {
          this.errorMessage = error.message;
        }
      }
    });
  }
}