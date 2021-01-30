import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../model/car';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  public car: Car;
  public companyName: string;
  public id: string;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private carrentalservice: CarRentalCompanyService) {
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
      ratingCounter: 0
      };
  
      this.route.paramMap.subscribe(params => {this.id = params.get('id'); console.log(params.get('id')) });
      this.carrentalservice.getCompanyCars("1", this.id).subscribe(
        (response) => { this.car = response[0]},
      )
     
  }
  editCar(editCarForm){
    console.log(editCarForm);
    if(editCarForm.valid){
     this.carrentalservice.editCar(this.car.id.toString(), this.car).subscribe(
        (response) => { console.log('Automobil uspesno izmenjen!');
        this.showSuccess("You have successfully upadeted car information!") },
        (error) => { console.error(error);
        this.showError(); }
      );
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
