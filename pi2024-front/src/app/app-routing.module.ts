import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { CreateDemandeComponent } from './create-demande/create-demande.component';
import { UpdateDemandeComponent } from './update-demande/update-demande.component';
import { LoginComponent } from './login/login.component';
import { userGuard } from './guards/user.guard'; // Update to use AuthGuard instead of userGuard
import { DemandeUserComponent } from './demande-user/demande-user.component';
import { UpdateStatutComponent } from './update-statut/update-statut.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; 
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { UploadComponent } from './upload/upload.component';
import { DetailsDemandeUserComponent } from './details-demande-user/details-demande-user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UpdateProfilComponent } from './update-profil/update-profil.component';


const routes: Routes = [
  { path: 'demandes/:userId', component: DemandeUserComponent }, // Protect the demandes route
  {path: 'Alldemandes', component: DemandeListComponent},
  {path: 'Dashboard', component: AdminDashboardComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'demandes/:userId/create-demande', component: CreateDemandeComponent }, // Protect the create-demande route
  { path: 'update-demande/:id', component: UpdateDemandeComponent/* canActivate: [userGuard] */ }, // Protect the update-demande route
  { path: 'update-statut/:id', component: UpdateStatutComponent/* canActivate: [userGuard] */ },
  { path: 'user-profile/:userId', component: UserProfileComponent/* canActivate: [userGuard] */ },
  { path: 'login', component: LoginComponent },
  { path: 'changermdp/:userId', component: UpdatePasswordComponent},
  { path: ':userId/diplome/:demandeId', component: DiplomeComponent },
 {path: ':userId/upload/:demandeId', component: UploadComponent }, 
 { path: ':userId/details-demande-user/:id', component: DetailsDemandeUserComponent/* canActivate: [userGuard] */ },
 { path: 'createaccount', component: CreateAccountComponent },
 { path: 'update-profile/:userId', component: UpdateProfilComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
