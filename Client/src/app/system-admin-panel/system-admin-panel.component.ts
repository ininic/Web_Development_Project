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
    this.state = 'carrentalcompany';
    this.carrentalcompany = {
      name: '',
      address: '',
      about: '',
      priceList: '',
      id: 1,
      branches: '', 
      rating: 0,
      ratingCounter: 0 
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
      //preuzimane administratora i renacar servisa sa servera
      this.getAdminsAndCompanies();
  }


  //izbor html segmenta
  setState(state: string){
    this.state = state;
    console.log(this.state);
  }

  //dodavanje novog renacar servisa
  addCarRentalCompany(addCompanyForm){
    if(addCompanyForm.valid){
      console.log('dodajem kompaniju')
      this.carRentalService.addCarRentalCompany(this.carrentalcompany).subscribe(
        (response) => { console.log('uspeh'); this.showSuccess("Car rental company has been succsesfuly added.");  this.getAdminsAndCompanies();},
        (error) => {   this.showError("This company name already exists in system");     }
      );
    }
    else{
      this.showWarning();
    }
  }

  //dodavanje novog administratora rentacar servisa 
  addAdmin(addcaradminForm){
    if(addcaradminForm.valid)
    {
    console.log('dodajem admina')
    this.user.role = 'carrentaladmin';
    this.userService.addAdmin(this.user).subscribe(
      (response) => { console.log('uspeh'); this.showSuccess("Car rental company admin has been succsesfuly added"); this.getAdminsAndCompanies();},
      (error) => { this.showError("This username already exists in system"); }
    );         
    }
    else {
      this.showWarning();
    }
  }

  //metoda koja dobavlja renacar servise i njihove administratore sa servera
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

  //brisanje rentacar servisa
  onDeleteCompany(id: string){
    this.carRentalService.deleteCompany(id).subscribe(
      (response) => {console.log('uspeh'); this.getAdminsAndCompanies(); this.showSuccess("Car rental company has been succsesfuly deleted.")},
      (error) => {console.log('neuspeh'); this.getAdminsAndCompanies(); this.showError("This company has been already deleted.")}
    )
  }

  //brisanje administratora rentacar servisa
  onDeleteAdmin(id: string){
    this.userService.deleteUser(id).subscribe(
      (response) => {console.log('uspeh'); this.getAdminsAndCompanies(); this.showSuccess("Car rental company has been succsesfuly deleted.")},
      (error) => {console.log('neuspeh'); this.getAdminsAndCompanies(); this.showError("This user has been already deleted.") }
    )
  }

  //toastr poruke za korisnika
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
