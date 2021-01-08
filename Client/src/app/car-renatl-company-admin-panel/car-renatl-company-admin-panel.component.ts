import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarRentalCompany } from '../model/car-rental-company';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { CommunicationService } from '../services/comunication.service';

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
  constructor(private _communicationService: CommunicationService, private carservice: CarRentalCompanyService) {
    this.companyName = localStorage.getItem('companyName');

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
      };

    this.carservice.getCompany('000',this.companyName).subscribe((response) => 
    { 
    this.company = response; 
    this.getCars(this.company.id.toString());
    console.log('OBSERVE "response" RESPONSE is ', this.company);
    this.carservice.getCompanyCars(this.company.id.toString(), "000").subscribe((response) => {this.cars = response; console.log('OBSERVE "response" RESPONSE is ', this.cars);})
    });
  }

  onEditCompany(){
    this.carservice.editCompany(this.company).subscribe(
      (response) => { 
        console.log('Kad menjam ovo je ime', this.company.name);
        localStorage.setItem('companyName', this.company.name);},
      (error) => { console.error(error);}
    );
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
      (response) => { console.log('Automobil izbrisan');
      this.getCars(this.company.id.toString());
    },
      (error) => {console.error('Neuspelo'); }
    );
    //this.getCars(this.company.id.toString());
  
  }
  
  

}
