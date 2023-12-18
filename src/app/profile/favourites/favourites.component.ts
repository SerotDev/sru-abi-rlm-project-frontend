import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Rating, RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [RatingModule, ReactiveFormsModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'  
})
export class FavouritesComponent {

}
