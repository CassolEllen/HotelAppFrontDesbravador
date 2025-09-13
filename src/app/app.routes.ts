import { Routes } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list';

export const routes: Routes = [
  { path: 'hoteis', component: HotelListComponent },
  { path: '', redirectTo: 'hoteis', pathMatch: 'full' }
];
