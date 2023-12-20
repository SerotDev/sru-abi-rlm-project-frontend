import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/auth/user.service'
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: any = {
    username: '',
    email: '',
    password: ''
  };
  isRegisterIn = false;
  isLoggedIn = false;
  isLoginFailed = false;
  isLoggin = false;
  isRegisterFailed = false;
  errorMessage = '';
  msg = '';
  rol: string | null = '';

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    if(window.sessionStorage.getItem("auth-token"))
    {
      this.isRegisterIn = true;
      this.isLoggedIn = true;
      this.rol = window.sessionStorage.getItem("auth-rol");
      this.register.username = window.sessionStorage.getItem("auth-username");
    }
  }

  registerUser(): void {
    this.isLoggin = true;
    this.userService.register(this.register.username,this.register.email, this.register.password)
    .subscribe({
      next: (response: any) => {
        this.isRegisterIn = true;
        this.userService.login(this.register.username, this.register.password).subscribe({
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
        this.isRegisterFailed = false;
        this.isLoggin = false;
      },
      error: (error: any) => {
        this.isLoggin = false;
        this.isRegisterFailed = true;
        if(error.error.Error != undefined)
        this.errorMessage = error.error.Error;
        else
        this.errorMessage = error.message;
      }
    });
  }
}