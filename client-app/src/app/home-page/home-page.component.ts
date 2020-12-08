import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user'
import { LoginParameters } from '../model/login-parameters';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { isLoweredSymbol } from '@angular/compiler';
import { CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public  username: number;
  public  password: string;
  public cookieValue: string;
  public user: User;
  constructor(private userService: UserService, private cookieService: CookieService) {
    
   

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
 
  }

  
   

}
