import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { CommunicationService } from '../services/comunication.service';
import { CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public user: User;
  constructor(private _communicationService: CommunicationService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      role: '',
      gender:'male',
      email: '',
      listOfFriends: '',
      id: 1,
      loggedIn: false,
      isDeleted: false,
      companyName: ''
    }
  }

  
  onSomething() {
    this._communicationService.emitChange({proprty: 'value'});
}
  logOut(){
    console.log('Odjavljivanje');
    this.cookieService.set('cookie-name','loggedOut');
  }

  editUser(){
    
  }
}
