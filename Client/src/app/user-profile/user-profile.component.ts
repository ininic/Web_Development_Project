import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { CommunicationService } from '../services/comunication.service';
import { CookieService} from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { error } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public username: String;
  public userId: string;
  public user: User;
  constructor(private toastr: ToastrService, private _communicationService: CommunicationService, private cookieService: CookieService, private userService: UserService) { 
    this.username  = localStorage.getItem('currentUserUsername');
    this.userId = localStorage.getItem('currentUserId');
  }

  ngOnInit(): void {
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
    console.log('ovo je id:' + this.userId);
    this.userService.getUserData(this.userId, "000").subscribe(
      (response) => { this.user = response; console.log('vraceni kor'+ this.user.lastname)},
      (error) => {console.error(error); }
    );
  }

  
  onSomething() {
    this._communicationService.emitChange({proprty: 'value'});
}
  logOut(){
    console.log('Odjavljivanje');
    localStorage.setItem('role', '');
    localStorage.setItem('jwt','')
    this.cookieService.set('cookie-name','loggedOut');
  }

  editUser(userEditForm){
    if(userEditForm.valid){
      this.userService.editUserData(this.userId,this.user).subscribe(
        (response) => {console.log('pozivam'); this.showSuccess("You have succsessfuly updated your personal information.")},
        (error) => {console.error(error); this.showError(); }     
      );
    } else{
      this.showWarning();
    }
    
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!")
  }
  showError(){
    this.toastr.error("Error!")
  }
}
