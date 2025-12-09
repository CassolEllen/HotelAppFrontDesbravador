import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HotelListComponent } from './hotel-list/hotel-list';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { UsuarioFormComponent } from './usuario/usuario-form';
import { UsuarioList } from './usuario/usuario-list';
import { FormulariosListComponent } from './formularios-list/formularios-list';
import { FormulariosCreate } from './formularios-create/formularios-create';
import { FormulariosEditComponent } from './formularios-edit/formularios-edit';
import { HotelCreateComponent } from './hotel-create/hotel-create';
import { HotelEditComponent } from './hotel-edit/hotel-edit';
import { HospedesEditComponent } from './hospedes-edit/hospedes-edit';
import { HospedeCreateComponent } from './hospedes-create/hospedes-create';
import { HospedesListComponent } from './hospedes-list/hospedes-list';
import { RelatorioQuestionarioComponent } from './relatorio-questionario/relatorio-questionario';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

  { path: 'hoteis', component: HotelListComponent, canActivate: [authGuard] },
  { path: 'hoteis/novo', component: HotelCreateComponent, canActivate: [authGuard] },
  { path: 'hoteis/editar/:id', component: HotelEditComponent, canActivate: [authGuard] },

  { path: 'usuarios', component: UsuarioList, canActivate: [authGuard] },
  { path: 'usuarios/novo', component: UsuarioFormComponent, canActivate: [authGuard] },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent, canActivate: [authGuard] },

  { path: 'formularios', component: FormulariosListComponent, canActivate: [authGuard] },
  { path: 'formularios/novo', component: FormulariosCreate, canActivate: [authGuard] },
  { path: 'formularios/editar/:id', component: FormulariosEditComponent, canActivate: [authGuard] },

  { path: 'hospedes', component: HospedesListComponent, canActivate: [authGuard] },
  { path: 'hospedes/novo', component: HospedeCreateComponent, canActivate: [authGuard] },
  { path: 'hospedes/editar/:id', component: HospedesEditComponent, canActivate: [authGuard] },


  { path: 'relatorios', component: RelatorioQuestionarioComponent, canActivate: [authGuard] },

  {
    path: 'envioFormulario',
    loadComponent: () =>
      import('./envio-formulario/envio-formulario')
        .then(m => m.EnvioFormularioComponent)
  }
];
