import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../model/car';
import { CarRentalCompanyService } from '../services/car-rental-company.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  public car: Car;
  public companyName: string;
  public mark: string;
  public model: string;
  public numberOfSeats: number;
  public year: number;
  public type: string;

  public carId: string;
  constructor(private route: ActivatedRoute, private carrentalservice: CarRentalCompanyService) {
   
    this.route.paramMap.subscribe(params => {
      this.carId = params.get('id'); 
      this.carrentalservice.getCompanyCars("1", this.carId).subscribe(
       (response: Car[]) => { this.car = response[0];
      
      
        this.companyName = this.car.nameOfCompany;
        this.mark = this.car.mark;
        this.model = this.car.model;
        this.numberOfSeats = this.car.numberOfSeats;
        this.year = this.car.year;
        this.type = this.car.type;
      },
      
     );});
   }

  ngOnInit(): void {
    
    
    
  }
}
