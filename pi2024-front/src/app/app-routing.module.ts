import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { CreateDemandeComponent } from './create-demande/create-demande.component';
import { UpdateDemandeComponent } from './update-demande/update-demande.component';
import { LoginComponent } from './login/login.component';
import { userGuard } from './guards/user.guard'; // Update to use AuthGuard instead of userGuard
import { DemandeUserComponent } from './demande-user/demande-user.component';

const routes: Routes = [
  { path: 'demandes/:userId', component: DemandeUserComponent }, // Protect the demandes route
  {path: 'Alldemandes', component: DemandeListComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'create-demande', component: CreateDemandeComponent }, // Protect the create-demande route
  { path: 'update-demande/:id', component: UpdateDemandeComponent, canActivate: [userGuard]  }, // Protect the update-demande route
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
