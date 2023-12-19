import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Rating, RatingModule } from 'primeng/rating';
import { DeleteSuccessComponent } from '../../delete-success/delete-success.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [RatingModule, ReactiveFormsModule, DeleteSuccessComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'  
})
export class FavouritesComponent {

}
