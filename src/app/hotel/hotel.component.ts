import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelsService } from '../services/hotels/hotels.service';
import { Hotel } from '../models/hotel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent implements OnInit {
  serviceHotel = inject(HotelsService);
  
  protected hotel: Hotel = {} as Hotel;

  constructor(private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  protected idHotel :any;
  protected loaded:boolean = false;

}
