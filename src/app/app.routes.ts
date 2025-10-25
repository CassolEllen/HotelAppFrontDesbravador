import { Routes } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list';
import { HotelFormComponent } from './hotel-form/hotel-form'; // novo componente

export const routes: Routes = [
  { path: 'hoteis', component: HotelListComponent },
  { path: 'hoteis/novo', component: HotelFormComponent }, // rota de cadastro
  { path: '', redirectTo: 'hoteis', pathMatch: 'full' }
];
