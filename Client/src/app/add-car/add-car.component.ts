import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarRentalCompanyService } from '../services/car-rental-company.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  public car: Car;
  public companyName: string;
  constructor(private carrentalservice: CarRentalCompanyService)
  { 
    this.companyName = localStorage.getItem('companyName');
  }

  ngOnInit(): void {

     
    this.car = {
      mark: '',
      model: '',
      nameOfCompany: '',
      numberOfSeats: 0,
      id: 0,
      year: 0,
      carRenalId: 0,
      type: ''
      };
  }

  addCar(){
    this.car.nameOfCompany = this.companyName;
    this.carrentalservice.addCar(this.car).subscribe( 
      (response) => {console.log('Uspesno dodat automobil'); },
      (error) => {console.error(error); })
  }
}
