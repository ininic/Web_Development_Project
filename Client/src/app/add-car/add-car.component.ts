import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  public car: Car;
  public companyName: string;
  constructor(private toastr: ToastrService, private carrentalservice: CarRentalCompanyService)
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
      type: '',
      rating: 0,
      ratingCounter: 0,
      };
  }

  addCar(addCarForm){
    if(addCarForm.valid){
    this.car.nameOfCompany = this.companyName;
    this.carrentalservice.addCar(this.car).subscribe( 
      (response) => {console.log('Uspesno dodat automobil');
      this.showSuccess("You have successfully added car!");
    },
      (error) => {console.error(error); 
      this.showError();
    });
    } else{
      this.showWarning();
    }       
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!")
  }
  showError(){
    this.toastr.error("Error!")
  }
}
