import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HotelComponent } from './hotel/hotel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FavouritesComponent } from './profile/favourites/favourites.component';

export const routes: Routes = [
    {path:'navbar', component: NavbarComponent},
    {path:'footer', component: FooterComponent},
    {path:'login', component: LoginComponent},
    {path:'hotel', component: HotelComponent},
    {path:'favourites', component: FavouritesComponent},
    ];

