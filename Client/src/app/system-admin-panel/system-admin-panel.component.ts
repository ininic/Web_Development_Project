import { Component, OnInit } from '@angular/core';
import { CarRentalCompany } from '../model/car-rental-company';
import { User } from '../model/user';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-system-admin-panel',
  templateUrl: './system-admin-panel.component.html',
  styleUrls: ['./system-admin-panel.component.css']
})
export class SystemAdminPanelComponent implements OnInit {

  public state: string;
  public carrentalcompany: CarRentalCompany;
  public user: User;
  constructor(private userService: UserService, private carRentalService: CarRentalCompanyService) { }

  ngOnInit(): void {
    this.carrentalcompany = {
      name: '',
      address: '',
      about: '',
      priceList: '',
      id: 1,
      branches: '', 
      };

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



  setState(state: string){
    this.state = state;
    console.log(this.state);
  }
  addCarRentalCompany(){
    console.log('dodajem kompaniju')
    this.carRentalService.addCarRentalCompany(this.carrentalcompany).subscribe(
      (response) => { console.log('uspeh'); }
    )
  }
  addAdmin(){
    console.log('dodajem admina')
    this.user.role = 'carrentaladmin';
    this.userService.addAdmin(this.user).subscribe(
      (response) => { console.log('uspeh');}
    );
  }
}
