import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HotelComponent } from './hotel/hotel.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'hotel', component: HotelComponent},
];
