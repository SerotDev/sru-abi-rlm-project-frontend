import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../../services/events/events.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {

  event : any = {
    title : '', description : '', img_url : '', start_date : '', end_date : '', is_public : '', entry_price : '', latitude : '', longitude : '', hotel : ''
  };
  added = false;
  send = false;

  constructor(private eventServices : EventsService) { }

  ngOnInit(): void {
  }

  saveEventRegister() : void {
    this.send = true;
    const data = {
      title : this.event.title,
      description : this.event.description,
      img_url : this.event.phone,
      start_date : this.event.address,
      end_date : this.event.email,
      is_public : this.event.web,
      entry_price : this.event.number_rooms,
      latitude : this.event.imgs_url,
      longitude : this.event.price,
      hotel : this.event.latitude
    };

    this.eventServices.addEvent(data)
    .subscribe({
      next: respuesta => {
        console.log(respuesta);
        this.added = true;
        this.send = false;
      },
      error: error => {
        console.log(error);
      }
    });
  
  }

  newEventRegister() : void {
    this.added = false;
    this.event = {
      title : '', description : '', img_url : '', start_date : '', end_date : '', is_public : '', entry_price : '', latitude : '', longitude : '', hotel : ''
    }
  };

}

