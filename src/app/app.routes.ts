import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HotelListComponent } from './hotel-list/hotel-list';
import { HotelFormComponent } from './hotel-form/hotel-form';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'hoteis', component: HotelListComponent, canActivate: [authGuard] },
  { path: 'hoteis/novo', component: HotelFormComponent, canActivate: [authGuard] },
  { path: 'hoteis/editar/:id', component: HotelFormComponent, canActivate: [authGuard] }
];
