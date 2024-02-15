import { ApplicationModule, Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/auth/user.service';
import { Router } from '@angular/router';
import { User, UserDTO } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ApplicationModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentTokenSesion: any;
  myForm!: FormGroup;
  currentIdUserSesion: any;

  protected user: any = {}; 

  constructor(
    private token: TokenStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    ) {}

  ngOnInit(): void {
    this.currentTokenSesion = this.token.getToken();
    console.log(this.currentTokenSesion);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentTokenSesion}`
    });

    this.currentIdUserSesion = this.token.getId();
    this.user = this.userService.getUserById(this.currentIdUserSesion);

    this.myForm = this.formBuilder.group({
      name: this.currentIdUserSesion.name,
      surname: this.currentIdUserSesion.surname,
      email: this.currentIdUserSesion.email,
      phone: this.currentIdUserSesion.phone,
      urlImage: this.currentIdUserSesion.urlImage
    });
  }
  
  onSubmit() {
    if (this.myForm.valid) {
      let formData = this.myForm.value;
      this.userService.editUserById(this.currentTokenSesion, formData).subscribe(response => {
        this.router.navigate(['/']);
      });
    }
  }
}
