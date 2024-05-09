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
import { DemandeUserComponent } from './demande-user/demande-user.component'; // Import MessageService
@NgModule({
  declarations: [
    AppComponent,
    DemandeListComponent,
    CreateDemandeComponent,
    UpdateDemandeComponent,
    LoginComponent,
    DemandeUserComponent,
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule
  ],
  providers: [
    MessageService, // Add MessageService to providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
