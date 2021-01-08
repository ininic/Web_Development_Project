import { HttpErrorResponse } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.resetUser();
  }
  resetUser(): void
  {
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

  register(): void {
    console.log('podaci iz forme' + this.user.gender);
    this.userService.Register(this.user).subscribe(
      (res : any) => {
      this.resetUser();
      console.log(res); 
    },
      (err : HttpErrorResponse) => {
        console.log(err);
                
      });
  }


}
