import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user'
import { LoginParameters } from '../model/login-parameters';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { isLoweredSymbol } from '@angular/compiler';
import { CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: LoginParameters;
  constructor( private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.login = {
      Username : 'Ivan',
      Password : '123'
    }
  }
  logIn() {
    this.authService.logIn(this.login)
    .subscribe((res) => { console.log(res), this.setCookie();},
              (err : HttpErrorResponse) => { console.log(err); },
             () => { console.log('hendling denflig');  }
          );

    }

    setCookie(){
      var date = new Date();
      date.setTime(date.getTime()+(5*1000));
      
       this.cookieService.set('cookie-name','our cookie value', date);
   
    }
}
