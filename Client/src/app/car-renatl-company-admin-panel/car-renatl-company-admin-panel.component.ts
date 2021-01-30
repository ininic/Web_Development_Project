import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarRentalCompany } from '../model/car-rental-company';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { CommunicationService } from '../services/comunication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-renatl-company-admin-panel',
  templateUrl: './car-renatl-company-admin-panel.component.html',
  styleUrls: ['./car-renatl-company-admin-panel.component.css']
})
export class CarRenatlCompanyAdminPanelComponent implements OnInit {

  public company: CarRentalCompany; 
  public cars: Car[];
  public id: string;
  //public car: Car;
  public companyName: string;
  public companyId: string;
  constructor(private toastr: ToastrService, private _communicationService: CommunicationService, private carservice: CarRentalCompanyService) {
    this.companyName = localStorage.getItem('companyName');
    this.companyId = localStorage.getItem('companyId');
    _communicationService.changeEmitted$.subscribe(data => {
      //this.ngOnInit();
      //this.getCars(this.companyName);
    });
   }

  ngOnInit(): void {
    this.company = {
      name: '',
      address: '',
      about: '',
      priceList: '',
      id: 1,
      branches: '', 
      rating: 0,
      ratingCounter: 0,
      };

     
    
    //prvi put kada se komponenta ucitava, tada se uzima kompanija preko imena
    //drugi put to se radi preko sacuvanog id-ja zbog toga sto je moguce, da je 
    //neko ko koristi isti nalog sa druge sesije u medjuvremenu u bazi izmenio ime kompanije
    if(this.companyId == "")
    {
      this.carservice.getCompany('000',this.companyName).subscribe((response) => 
      {   
      this.company = response; 
      localStorage.setItem('companyId', this.company.id.toString());
      this.getCars(this.company.id.toString());
      console.log('OBSERVE "response" RESPONSE is ', this.company);
      this.carservice.getCompanyCars(this.company.id.toString(), "000").subscribe((response) => {this.cars = response; console.log('OBSERVE "response" RESPONSE is ', this.cars);})
      });
    }
    else{
      this.carservice.getCompany(this.companyId,"000").subscribe((response) => 
      {   
      this.company = response; 
      this.getCars(this.company.id.toString());
      console.log('OBSERVE "response" RESPONSE is ', this.company);
      this.carservice.getCompanyCars(this.company.id.toString(), "000").subscribe((response) => {this.cars = response; console.log('OBSERVE "response" RESPONSE is ', this.cars);})
      });
    }
  }

  onEditCompany(editedForm){
    if(editedForm.valid){

    
    this.carservice.editCompany(this.company).subscribe(
      (response) => { 
        console.log('Kad menjam ovo je ime', this.company.name);
        localStorage.setItem('companyName', this.company.name);
        this.showSuccess("You have successfully updated information about company!")
      },
      (error) => { console.error(error);}
    );
    } else {
     this.showWarning();
    }
  }

  
  getCars(id: string)
  {
    this.carservice.getCompanyCars(id, "000").subscribe(
      (response) => {  this.cars = response;  console.log('Evo ih' + this.cars);},
      (error) => { console.error(error); }
    )
  }
  onDeleteCar(id: string){
    this.carservice.deleteCar(id).subscribe(
      (response) => { 
        console.log('Automobil izbrisan');
        this.getCars(this.company.id.toString());
        this.showSuccess("You have successfully deleted car!")
    },
      (error) => {
        console.error('Neuspelo'); 
        this.showError();

    }
    );
    //this.getCars(this.company.id.toString());
  
  }
  
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!")
  }
  showError(){
    this.toastr.error("Login failed: Invalid username or password.")
  }

}
