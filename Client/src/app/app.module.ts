import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormField } from '@angular/material/form-field'
import { RouterModule } from '@angular/Router';
import { JwtModule } from '@auth0/angular-jwt';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';


 


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
import { CarRenatalCompaniesComponent } from './car-renatal-companies/car-renatal-companies.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthInterceptor } from './services/jwt-interceptor.service';
import { CarRenatlCompanyProfileComponent } from './car-renatl-company-profile/car-renatl-company-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { CarRenatlCompanyAdminPanelComponent } from './car-renatl-company-admin-panel/car-renatl-company-admin-panel.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { AuthGuardCarRentalAdminService } from './services/auth-guard-car-rental-admin.service';
import { AirlineAdminPanelComponent } from './airline-admin-panel/airline-admin-panel.component';
import { AuthGuardAirlineAdminService } from './services/auth-guard-airline-admin.service';
import { SystemAdminPanelComponent } from './system-admin-panel/system-admin-panel.component';
import { AuthGuardSystemAdminService } from './services/auth-guard-system-admin.service';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AuthGuardUserService } from './services/auth-guard-user.service';



export function tokengGetter(){
  return localStorage.getItem("jwt");
}



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    AirlinesComponent,
    HotelsComponent, 
    AirlineProfileComponent,
    CarRenatalCompaniesComponent,
    UserProfileComponent,
    CarRenatlCompanyProfileComponent,
    RegistrationComponent,
    CarRenatlCompanyAdminPanelComponent,
    AddCarComponent,
    EditCarComponent,
    SystemAdminPanelComponent,
    ReservationDetailsComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/airlines', pathMatch: 'full'},
      {path: 'home', component: AirlinesComponent},
      {path: 'login', component: LoginComponent},
      {path: 'airlines', component: AirlinesComponent},
      {path: 'airlines/:id', component: AirlineProfileComponent},
      {path: 'carrentals', component: CarRenatalCompaniesComponent},
      {path: 'carrentals/:id', component: CarRenatlCompanyProfileComponent},
      {path: 'hotels', component: HotelsComponent, canActivate: [AuthGuardService]},
      {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
      {path: 'registration', component: RegistrationComponent},
      {path: 'carrentaladmin', component: CarRenatlCompanyAdminPanelComponent, canActivate: [AuthGuardCarRentalAdminService]},
      {path: 'addcar', component: AddCarComponent, canActivate: [AuthGuardCarRentalAdminService]},
      {path: 'editcar/:id', component: EditCarComponent, canActivate: [AuthGuardCarRentalAdminService]},
      {path: 'airlineadmin', component: AirlineAdminPanelComponent, canActivate: [AuthGuardAirlineAdminService]},
      {path: 'systemadmin', component: SystemAdminPanelComponent, canActivate: [AuthGuardSystemAdminService]},
      {path: 'reservationdetails/:start/:end/:action', component: ReservationDetailsComponent, canActivate: [AuthGuardUserService]},
      {path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuardUserService]}
      
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
