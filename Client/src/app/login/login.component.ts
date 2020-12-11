import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user'
import { LoginParameters } from '../model/login-parameters';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { isLoweredSymbol } from '@angular/compiler';
import { CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {HomePageComponent} from 'src/app/home-page/home-page.component';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommunicationService } from '../services/comunication.service';
import { JwtHelperService } from "@auth0/angular-jwt";




@Component({
  providers:[HomePageComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() private toggleFavorite: EventEmitter<number>;
  public login: LoginParameters;
  constructor(private authService: AuthService, private cookieService: CookieService, private route: Router,private _communicationService: CommunicationService)
   {
   
    //const decodedToken = helper.decodeToken(myRawToken);
    //const expirationDate = helper.getTokenExpirationDate(myRawToken);
    //const isExpired = helper.isTokenExpired(myRawToken); 
    }
  invalidLogin : boolean;
  ngOnInit(): void {
    this.login = {
      Username : 'Ivan',
      Password : '123'
    }
  }
  logIn() {
    this.authService.logIn(this.login)
    .subscribe((response: any) => { 
               const token: any = response.token;
               console.log(response);
               this.invalidLogin = false;
               localStorage.setItem("jwt", token);
               const helper = new JwtHelperService();
               console.log("Jwt istice:", helper.getTokenExpirationDate(token));
               const exp = helper.getTokenExpirationDate(token);
               this.setCookie(exp); this.onSomething();
     
            },
              (err : HttpErrorResponse) => { 
                this.invalidLogin = true;
                console.log(err); },
             () => { console.log('hendling denflig');  } 
          );

    }

    setCookie(exp: any){
      var date = new Date();
      //date.setTime(date.getTime()+(5*1000)); 
      console.log("datum",exp);
      date = exp;
       this.cookieService.set('cookie-name','our cookie value', date);
   
    }
   
    onSomething() {
      this._communicationService.emitChange({proprty: 'value'});
  }
}
