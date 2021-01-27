import { Component, OnInit } from '@angular/core';
import { CarRentalCompany } from '../model/car-rental-company';
import { User } from '../model/user';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-system-admin-panel',
  templateUrl: './system-admin-panel.component.html',
  styleUrls: ['./system-admin-panel.component.css']
})
export class SystemAdminPanelComponent implements OnInit {

  public state: string;
  public carrentalcompany: CarRentalCompany;
  public user: User;
  public admins: User[];
  public companies: CarRentalCompany[];

  constructor(private toastr: ToastrService, private userService: UserService, private carRentalService: CarRentalCompanyService) { }

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
      this.getAdminsAndCompanies();
  }



  setState(state: string){
    this.state = state;
    console.log(this.state);
  }
  addCarRentalCompany(addCompanyForm){
    if(addCompanyForm.valid){
      console.log('dodajem kompaniju')
      this.carRentalService.addCarRentalCompany(this.carrentalcompany).subscribe(
        (response) => { console.log('uspeh'); this.showSuccess("Car rental company has been succsesfuly added.")},
        (error) => {   this.showError("This company name already exists in system");     }
      );
    }
    else{
      this.showWarning();
    }
  }
  addAdmin(addcaradminForm){
    if(addcaradminForm.valid)
    {
    console.log('dodajem admina')
    this.user.role = 'carrentaladmin';
    this.userService.addAdmin(this.user).subscribe(
      (response) => { console.log('uspeh'); this.showSuccess("Car rental company admin has been succsesfuly added");},
      (error) => { this.showError("This username already exists in system"); }
    );         
    }
    else {
      this.showWarning();
    }
  }

  getAdminsAndCompanies(){
    this.carRentalService.getCompanies().subscribe(
      (response) => { this.companies = response; console.log('companies:', this.companies);},
      (error) => { console.error('nemoguce dobaviti kompanije sa servera');}
    )
    this.userService.getUsersByRole('carrentaladmin').subscribe(
      (response) => { this.admins = response; console.log('admins:', this.admins); },
      (error) => { console.error('nemoguce dobaviti administratore rentacar servisa sa servera');}
    )
  }


  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!")
  }
  showError(message: string){
    this.toastr.error(message);
  }

}
