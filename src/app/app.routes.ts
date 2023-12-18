import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HotelComponent } from './hotel/hotel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AddHotelComponent } from './profile/add-hotel/add-hotel.component';
import { UpdateHotelComponent } from './profile/update-hotel/update-hotel.component';
import { HotelsComponent } from './profile/hotels/hotels.component';
import { EventsComponent } from './profile/hotels/events/events.component';
import { AddEventComponent } from './profile/hotels/add-event/add-event.component';
import { UpdateEventComponent } from './profile/hotels/update-event/update-event.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'navbar', component: NavbarComponent},
    {path:'footer', component: FooterComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'hotel', component: HotelComponent},
    {path:'home', component: HomeComponent},
    {path:'hotel/add-hotel', component: AddHotelComponent},
    {path:'hotels', component: HotelsComponent},
    {path:'hotel/update-hotel', component: UpdateHotelComponent},
    {path:'hotel/events', component: EventsComponent},
    {path:'hotel/add-event', component: AddEventComponent},
    {path:'hotel/update-event', component: UpdateEventComponent},
    ];

