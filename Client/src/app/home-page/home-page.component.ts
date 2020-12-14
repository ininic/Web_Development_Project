import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user'
import { LoginParameters } from '../model/login-parameters';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { isLoweredSymbol } from '@angular/compiler';
import { CookieService} from 'ngx-cookie-service';

import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CommunicationService } from '../services/comunication.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  logged : number = 0;
  public  username: number;
  public  password: string;
  public cookieValue: string;
  public jwt:string;
  public user: User;
  public role: Object;
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router,private _communicationService: CommunicationService) {
    
      //kada se desi promena na login-u aktivirace se _communicationService
      //i ponovo ce se inicijalizovati home-page, sa novim vrednostima
    _communicationService.changeEmitted$.subscribe(data => {
      console.log('aaaa', data);
      this.logged = 10;
      this.cookieValue = this.cookieService.get('cookie-name');
      this.jwt = localStorage.getItem('jwt');
      const helper = new JwtHelperService();
      this.role = helper.decodeToken(this.jwt)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      })

   }

  ngOnInit(): void {
    
    
    this.user = {
      Username: 'ininic',
      Password: '123',
      FirstName: 'ininic',
      Lastname: 'ininic',
      Role: 'ininic',
      Gender:'ininic',
      Email: 'ininic',
      ListOfFriends: '',
      Id: 1,
      LoggedIn: false,
      IsDeleted: false

       
      };
     

      this.cookieValue = this.cookieService.get('cookie-name');
      this.jwt = localStorage.getItem('jwt');

     
  }
  
  onSomething() {
    this._communicationService.emitChange({proprty: 'value'});
}
  
 
    
}
