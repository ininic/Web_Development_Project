import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../model/car';
import { CarRentalCompany } from '../model/car-rental-company';
import { CarRentalCompanyService } from '../services/car-rental-company.service';

@Component({
  selector: 'app-car-renatl-company-profile',
  templateUrl: './car-renatl-company-profile.component.html',
  styleUrls: ['./car-renatl-company-profile.component.css']
})
export class CarRenatlCompanyProfileComponent implements OnInit {
  public company: CarRentalCompany; 
  public cars: Car[];
  public car: Car; 
  public id: string;
  public name: string;
  public address: string;
  public about: string;
  public priceList: string;
  public branches: string;
  constructor(private carservice: CarRentalCompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {this.id = params.get('id'); console.log(params.get('id')) });
    this.carservice.getCompany(this.id,'000').subscribe((response) => { this.company = response; console.log('OBSERVE "response" RESPONSE is ', this.company);
    this.carservice.getCompanyCars(this.id, "000").subscribe((response) => {this.cars = response; console.log('OBSERVE "response" RESPONSE is ', this.cars);});
    this.name = this.company.name;
    this.about = this.company.about;
    this.address = this.company.address;
    this.priceList = this.company.priceList;
    this.branches = this.company.branches;

  });
} 

}
