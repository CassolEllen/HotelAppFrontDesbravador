import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HotelListComponent } from './hotel-list/hotel-list';
import { HotelFormComponent } from './hotel-form/hotel-form';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'hoteis', component: HotelListComponent },
  { path: 'hoteis/novo', component: HotelFormComponent },
];
