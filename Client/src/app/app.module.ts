import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/Router';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserService } from './services/user.service';
import { CommunicationService } from './services/comunication.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { HotelsComponent } from './hotels/hotels.component'; // CLI imports AppRoutingModule
import { AirlineService } from './services/airline.service';
import { AirlineProfileComponent } from './airline-profile/airline-profile.component';
import { AuthGuardService } from './services/auth-guard.service';

export function tokengGetter(){
  return localStorage.getItem("jwt"  );
}



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    AirlinesComponent,
    HotelsComponent,
    AirlineProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/airlines', pathMatch: 'full'},
      {path: 'home', component: HomePageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'airlines', component: AirlinesComponent},
      {path: 'airlines/:id', component: AirlineProfileComponent},
      {path: 'hotels', component: HotelsComponent, canActivate: [AuthGuardService]},
      
    ]),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokengGetter,
        allowedDomains: ["localhost:44325"],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [
    UserService,
    CookieService,
    CommunicationService,
    AirlineService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
