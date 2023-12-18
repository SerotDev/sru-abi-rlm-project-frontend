import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/auth/user.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
  role: string | null = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    if(window.sessionStorage.getItem("auth-token"))
    {
      this.isLoggedIn = true;
      this.role = window.sessionStorage.getItem("auth-role");
      this.login.username = window.sessionStorage.getItem("auth-username");
    }
  }
  logUser(): void {
    this.isLoggin = true;
    this.userService.login(this.login.username, this.login.password)
      .subscribe({
        next: (response) => {
          window.sessionStorage.setItem("auth-token", response.token);
          window.sessionStorage.setItem("auth-username", this.login.username);
  
          this.isLoginFailed = false;
          this.isLoggin = false;
          this.isLoggedIn = true;
  
          this.recogerRol();
        },
        error: (error) => {
          this.isLoggin = false;
          this.isLoginFailed = true;
          if ("Http failure response for https://sru-abi-rlm-project-backend-production.up.railway.app/login: 403 OK" == error.message) {
            this.errorMessage = 'Incorrect User and/or Password';
          }
        }
      });
  }

  recogerRol(): void {
    this.userService.getUsuario(this.login.username)
      .subscribe({
        next: (response) => {
          window.sessionStorage.setItem("auth-role", response.rol.nombre);
          window.location.reload();
        },
        error: (error) => {
          console.log(error.message);
        }
      });
  }
}