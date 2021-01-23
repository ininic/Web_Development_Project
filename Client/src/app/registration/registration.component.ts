import { HttpErrorResponse } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public user: User;
  constructor(private toastr: ToastrService, private userService: UserService) { }

  ngOnInit(): void {
    this.resetUser();
  }
  resetUser(): void
  {
    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastname: '',
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

  register(registrationForm): void {
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

  
  showSuccess() {
    this.toastr.success("You Have Successfully Logged in!");
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!")
  }
  showError(){
    this.toastr.error("Login failed: Invalid username or password.")
  }


}
 