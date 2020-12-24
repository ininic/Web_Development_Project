import { Component, OnInit } from '@angular/core';
import { CarRentalCompany } from '../model/car-rental-company';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-car-renatal-companies',
  templateUrl: './car-renatal-companies.component.html',
  styleUrls: ['./car-renatal-companies.component.css']
})
export class CarRenatalCompaniesComponent implements OnInit {

  public companies: CarRentalCompany[];
  public company: CarRentalCompany; 
  constructor(private carservice: CarRentalCompanyService, private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.carservice.getCompanies().subscribe((response) => { this.companies = response; console.log('OBSERVE "response" RESPONSE is ', this.companies);
 });
  }

}
