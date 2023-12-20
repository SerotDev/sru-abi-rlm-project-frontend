import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HotelComponent } from './hotel/hotel.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { FavouritesComponent } from './profile/favourites/favourites.component';
import { ProfileComponent } from './profile/profile.component';
import { HotelsComponent } from './profile/hotels/hotels.component';
import { AddHotelComponent } from './profile/add-hotel/add-hotel.component';
import { UpdateHotelComponent } from './profile/update-hotel/update-hotel.component';
import { EventsComponent } from './profile/hotels/events/events.component';
import { AddEventComponent } from './profile/hotels/add-event/add-event.component';
import { UpdateEventComponent } from './profile/hotels/update-event/update-event.component';
import { EventComponent } from './event/event.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'hotels-list', component: SearchComponent },
    { path: 'map', component: SearchMapComponent },
    { path: 'hotel/:id', component: HotelComponent },
    { path: 'event/:id', component: EventComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'favourites', component: FavouritesComponent },
    { path: 'my-hotels', component: HotelsComponent},
    { path: 'my-hotels/add-hotel', component: AddHotelComponent },
    { path: 'my-hotels/update-hotel', component: UpdateHotelComponent },
    { path: 'my-hotel/events', component: EventsComponent},
    { path: 'my-hotel/add-event', component: AddEventComponent},
    { path: 'my-hotel/update-event', component: UpdateEventComponent},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];
