import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { AddHotelComponent } from './components/hotel/add-hotel/add-hotel.component';
import { UpdateHotelComponent } from './components/hotel/update-hotel/update-hotel.component';
import { EventComponent } from './components/event/event.component';
import { AddEventComponent } from './components/event/add-event/add-event.component';
import { UpdateEventComponent } from './components/event/update-event/update-event.component';
import { AddRoleComponent } from './components/roles/add-role/add-role.component';
import { UpdateRoleComponent } from './components/roles/update-role/update-role.component';
import { AdminGuardService } from './_services/auth/admin-guard.service';
import { AuthGuardService } from './_services/auth/auth-guard.service';

export const routes: Routes = [

  {path:'', component: HomeComponent, canActivate: [AuthGuardService]},
  {path:'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'hotel', component: HotelComponent, canActivate: [AuthGuardService]},
  {path:'hotel/add', component: AddHotelComponent, canActivate: [AuthGuardService]},
  {path:'hotel/update', component: UpdateHotelComponent, canActivate: [AuthGuardService]},
  {path:'event', component: EventComponent, canActivate: [AuthGuardService]},
  {path:'event/add', component: AddEventComponent, canActivate: [AuthGuardService]},
  {path:'event/update', component: UpdateEventComponent, canActivate: [AuthGuardService]},
  {path:'roles/add', component: AddRoleComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path:'roles/:id', component: UpdateRoleComponent, canActivate: [AuthGuardService, AdminGuardService]},

];
