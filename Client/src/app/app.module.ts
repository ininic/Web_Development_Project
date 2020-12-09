import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserService } from './services/user.service';
import { CommunicationService } from './services/comunication.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { RouterModule } from '@angular/Router';
import { FlightsComponent } from './flights/flights.component';
import { HotelsComponent } from './hotels/hotels.component'; // CLI imports AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    FlightsComponent,
    HotelsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/flights', pathMatch: 'full'},
      {path: 'home', component: HomePageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'flights', component: FlightsComponent},
      {path: 'flights/login', component: LoginComponent},
      {path: 'hotels', component: HotelsComponent},
      
    ])
  ],
  providers: [
    UserService,
    CookieService,
    CommunicationService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
