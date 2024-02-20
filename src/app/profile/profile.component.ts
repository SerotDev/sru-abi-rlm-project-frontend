import { ApplicationModule, Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/auth/user.service';
import { Router } from '@angular/router';
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
  protected loaded: boolean = false

  constructor(
    private token: TokenStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.currentTokenSesion = this.token.getToken();
    console.log(this.currentTokenSesion);

    this.currentIdUserSesion = this.token.getId();
    console.log(this.currentIdUserSesion);

    this.userService.getUserById(this.currentIdUserSesion, this.currentTokenSesion).subscribe({
      next: (response: any) => {
        this.user = response;
        this.loaded = true;
        console.log(JSON.stringify(response));

        
    this.myForm = this.formBuilder.group({
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      phone: this.user.phone,
      urlImage: this.user.urlImage
    });
  },
  error: (error: any) => {
    console.log("Error getting User:\n" + JSON.stringify(error));
  }
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

  camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    }).replace(/\s+/g, '');
  }

}
