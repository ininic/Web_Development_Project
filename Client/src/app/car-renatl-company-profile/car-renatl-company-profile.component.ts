import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarRentalCompany } from '../model/car-rental-company';
import { CarRentalCompanyService } from '../services/car-rental-company.service';

@Component({
  selector: 'app-car-renatl-company-profile',
  templateUrl: './car-renatl-company-profile.component.html',
  styleUrls: ['./car-renatl-company-profile.component.css']
})
export class CarRenatlCompanyProfileComponent implements OnInit {
  public company: CarRentalCompany; 
  public id: string;
  public name: string;
  public adress: string;
  public about: string;
  constructor(private carservice: CarRentalCompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {this.id = params.get('id'); console.log(params.get('id')) });
    this.carservice.getCompany(this.id).subscribe((response) => { this.company = response; console.log('OBSERVE "response" RESPONSE is ', this.company);
    this.name = this.company.name;
    this.about = this.company.about;
    this.adress = this.company.adress;
  });
} 

}
