import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbCarouselModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent {
  rating: number = 0;

  rateHotel(stars: number): void {
    this.rating = stars;
  }

}
