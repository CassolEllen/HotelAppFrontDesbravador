import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HotelListComponent } from './hotel-list/hotel-list';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { UsuarioForm } from './usuario/usuario-form';
import { UsuarioList } from './usuario/usuario-list';
import { FormulariosListComponent } from './formularios-list/formularios-list';
import { FormularioService } from './services/formulario-service';
import { FormulariosCreate } from './formularios-create/formularios-create';
import { HotelCreateComponent } from './hotel-create/hotel-create';
import { HotelEditComponent } from './hotel-edit/hotel-edit';
import { HospedesEditComponent } from './hospedes-edit/hospedes-edit';
import { HospedeCreateComponent } from './hospedes-create/hospedes-create';
import { HospedesListComponent } from './hospedes-list/hospedes-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'hoteis', component: HotelListComponent, canActivate: [authGuard] },
  { path: 'hoteis/novo', component: HotelCreateComponent, canActivate: [authGuard] },
  { path: 'hoteis/editar/:id', component: HotelEditComponent, canActivate: [authGuard] },
  { path: 'usuarios', loadComponent: () => import('./usuario/usuario-list').then(m => m.UsuarioList) },
  { path: 'usuarios', component: UsuarioList },
  { path: 'usuarios/novo', component: UsuarioForm },
  { path: 'usuarios/editar/:id', component: UsuarioForm },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'formularios', component: FormulariosListComponent },
  { path: 'formularios/novo', component: FormulariosCreate },
  { path: 'formularios/editar/:id', component: FormularioService },
  { path: 'hospedes', component: HospedesListComponent },
  { path: 'hospedes/novo', component: HospedeCreateComponent },
  { path: 'hospedes/editar/:id', component: HospedesEditComponent }
];

