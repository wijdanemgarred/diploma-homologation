import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { CreateDemandeComponent } from './create-demande/create-demande.component';
import { UpdateDemandeComponent } from './update-demande/update-demande.component';
import { LoginComponent } from './login/login.component';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { DemandeUserComponent } from './demande-user/demande-user.component';
import { UpdateStatutComponent } from './update-statut/update-statut.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; // Import MessageService
import {MatIconModule} from '@angular/material/icon';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { UploadComponent } from './upload/upload.component';
import { DetailsDemandeUserComponent } from './details-demande-user/details-demande-user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { UpdateProfilComponent } from './update-profil/update-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    DemandeListComponent,
    CreateDemandeComponent,
    UpdateDemandeComponent,
    LoginComponent,
    DemandeUserComponent,
    UpdateStatutComponent,
    UserProfileComponent,
    UpdatePasswordComponent,
    DiplomeComponent,
    UploadComponent,
    DetailsDemandeUserComponent,
    AdminDashboardComponent,
    CreateAccountComponent,
    SuccessDialogComponent,
    UpdateProfilComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    MatIconModule,
    MatCardModule // <- Add MatCardModule here
  ],
  providers: [
    MessageService,
    provideAnimationsAsync(), // Add MessageService to providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
