import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HotelComponent } from './hotel/hotel.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { SearchMapComponent } from './search-map/search-map.component';

export const routes: Routes = [
    {path:'', component: HomeComponent, pathMatch: 'full'},
    {path:'about', component: AboutComponent},
    {path:'about', component: AboutComponent},
    {path:'login', component: LoginComponent},
    {path:'hotels-list', component: SearchComponent},
    {path:'map', component: SearchMapComponent},
    {path:'hotel:id', component: HotelComponent},
    {path:'event:id', component: HotelComponent},
    {path:'not-found', component: NotFoundComponent},
    {path:'**', redirectTo: '/not-found'}
    ];

