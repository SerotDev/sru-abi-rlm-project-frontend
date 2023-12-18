import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HotelComponent } from './hotel/hotel.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { FavouritesComponent } from './profile/favourites/favourites.component';


export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'about', component: AboutComponent},
    {path:'about', component: AboutComponent},
    {path:'login', component: LoginComponent},
    {path:'favourites', component: FavouritesComponent},
    {path:'hotels-list', component: SearchComponent},
    {path:'map', component: SearchMapComponent},
    {path:'hotel:id', component: HotelComponent},
    {path:'event:id', component: HotelComponent},
    {path:'not-found', component: NotFoundComponent},
    {path:'**', component: NotFoundComponent}
    ];

