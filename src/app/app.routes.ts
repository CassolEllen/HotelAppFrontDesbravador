import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HotelListComponent } from './hotel-list/hotel-list';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { UsuarioForm } from './usuario/usuario-form';
import { UsuarioList } from './usuario/usuario-list';
import { FormulariosListComponent } from './formularios-list/formularios-list';
import { FormulariosCreate } from './formularios-create/formularios-create';
import { FormulariosEditComponent } from './formularios-edit/formularios-edit';
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

  { path: 'usuarios', component: UsuarioList },
  { path: 'usuarios/novo', component: UsuarioForm },
  { path: 'usuarios/editar/:id', component: UsuarioForm },

  { path: 'formularios', component: FormulariosListComponent },
  { path: 'formularios/novo', component: FormulariosCreate },
  { path: 'formularios/editar/:id', component: FormulariosEditComponent },

  { path: 'hospedes', component: HospedesListComponent },
  { path: 'hospedes/novo', component: HospedeCreateComponent },
  { path: 'hospedes/editar/:id', component: HospedesEditComponent },

  {
    path: 'envioFormulario',
    loadComponent: () =>
      import('./formularios-envio/formularios-envio')
        .then(m => m.EnvioFormularioComponent)
  }
];
