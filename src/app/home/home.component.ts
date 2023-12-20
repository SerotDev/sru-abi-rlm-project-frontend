import { Component, OnInit, inject } from '@angular/core';
import { NoLoggedService } from '../services/no-logged.service';
import { Town } from '../models/town';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  
  serviceNoLogged = inject(NoLoggedService);

  protected towns: Town[] = [];
  protected town: Town = {} as Town;  
  protected loaded: boolean = false;

  ngOnInit(): void {
      this.serviceNoLogged.getTowns().subscribe(data => {
          this.towns = data.results;
          this.loaded = true;
      },
      error => {console.log("error getting towns")} ) 
    };
}

  

