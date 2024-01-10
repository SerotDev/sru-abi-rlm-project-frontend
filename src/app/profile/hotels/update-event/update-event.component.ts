import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events/events.service';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent {

  event : any = {
    title : '', description : '', img_url : '', start_date : '', end_date : '', is_public : '', entry_price : '', latitude : '', longitude : '', hotel : ''
  };
  dataCollection = false;
  updated = false;
  send = false;

  constructor(private eventService : EventsService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.eventService.getEventById(this.route.snapshot.paramMap.get('id'))
    .subscribe(
      answer => {
        this.dataCollection = true;
        this.event = answer;
    });
  }

  updateRegister(): void {
    this.send = true;
    const data = {
      id: this.event.id,
      name : this.event.name,
      description : this.event.description,
      phone : this.event.phone,
      address : this.event.address,
      email : this.event.email,
      web : this.event.web,
      number_rooms : this.event.number_rooms,
      imgs_url : this.event.imgs_url,
      price : this.event.price,
      latitude : this.event.latitude,
      longitude : this.event.longitude,
      town : this.event.town,
    };
  
    this.eventService.updateEventById(data.id, data).subscribe({
      next: () => {
        this.updated = true;
        this.send = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
