import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { Reservation } from '../model/reservation';
import { CommunicationService } from '../services/comunication.service';
import { ReservationService } from '../services/reservation.service';
import {Router} from '@angular/router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  //currentRate = 0;
  reservations: Reservation[];
  flags: boolean[];
  carRatingFlags: boolean[];
  companyRatingFlags: boolean[];
  cars: Car[];
  currentUserId: string;
  public pickupDate: Date;
  public currentCarRates: number [];
  public currentCompanyRates: number [];
  constructor(private toastr: ToastrService, private reservationService: ReservationService, private communicationService: CommunicationService, private router: Router) {
    this.currentUserId = localStorage.getItem('currentUserId');
    this.flags = [];
    this.currentCarRates = [];
    this.currentCompanyRates = [];
    this.carRatingFlags = [];
    this.companyRatingFlags = [];
    /*
    this.PickupDate = new Date(this.startDate);
    var now = new Date(this.startDate);
      var diff = this.PickupDate.valueOf() - this.selectedStartDate.valueOf();*/
   }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservationService.getResrvations(this.currentUserId).subscribe(
    (response) => {
      this.reservations = response.listOfReservations; this.cars = response.listOfCars; console.log(this.reservations);
      //traba proci kroz rezervacije i postaviti jedinicu za svaku ciji je start time prosao
      for (var i = 0; i < this.reservations.length; i++)
      {
        this.currentCarRates[i] = 0;
        this.currentCompanyRates[i] = 0;
        this.carRatingFlags[i] = false;
        this.companyRatingFlags[i] = false;
        var now = new Date();
        this.pickupDate = new Date(this.reservations[i].start);
        if((this.pickupDate.valueOf() - now.valueOf())/1000 > 3600)
        {
          this.flags[i] = true;
          console.log('tacno');
        }
        else{
          this.flags[i] = false;
          console.log('netacno', this.flags[i]);
        }

      }
      console.log(this.flags);
    },
    (error) => {console.error('Greska!');}

    )
  }

  Redirect(car: Car, reservation: Reservation)
  {
    this.communicationService.nextCar(car)
    this.communicationService.nextReservation(reservation);
   // this.communicationService.nextMessage(reservation);
    //localStorage.setItem('car', car.);
    //this.comunicationService.sendData(car);
    this.router.navigate(['/reservationdetails', reservation.start, reservation.end, 'delete']);
  }

  rateCar(rate: number, rb: number){
    this.carRatingFlags[rb] = true;
    console.log(rate,this.reservations[rb].carId, this.reservations[rb].id );
    this.reservationService.rateCar(this.reservations[rb].carId, this.reservations[rb].id, rate).subscribe(
      (response) => {console.log('uspeh'); this.showSuccess('You have successfully rated a car.');},
      (error) => {console.log('neuspeh'); this.showError('You have already rated this car.'); }
    )
  }
  rateCompany(rate: number, rb: number){
    this.companyRatingFlags[rb] = true;
    console.log(rate);
    this.reservationService.rateCompany(this.reservations[rb].carId, this.reservations[rb].id, rate).subscribe(
      (response) => {console.log('uspeh'); this.showSuccess('You have successfully rated a company.'); },
      (error) => {console.log('neuspeh'); this.showError('You have already rated this company.'); }
    )
   
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!");
  }
  showError(message: string){
    this.toastr.error(message);
  }


}
