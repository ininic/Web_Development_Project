import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car';
import { CommunicationService } from '../services/comunication.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Reservation } from '../model/reservation';
import { ParsedEvent } from '@angular/compiler';
import { Parser } from '@angular/compiler/src/ml_parser/parser';
import { ReservationService } from '../services/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  //message:string;
  public car: Car;
  public startDate: string;
  public endDate: string;
  public startPrintDate: string;
  public endPrintDate: string;
  public reservation: Reservation;
  public currentReservation: Reservation;
  public userId: string;
  public action: string;
  constructor(private toastr: ToastrService, private reservationService: ReservationService, private _location: Location, private route: ActivatedRoute, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {this.startDate = params.get('start'); this.endDate = params.get('end');  this.action = params.get('action'); console.log(params.get('id')) });
    this.communicationService.sharedMessage.subscribe(message => this.car = message)
    this.communicationService.sharedMessage2.subscribe(message2 => this.currentReservation= message2)
    console.log(this.currentReservation);
    this.startPrintDate = this.startDate.replace('T','  ');
    this.endPrintDate = this.endDate.replace('T','  ');
    this.userId = localStorage.getItem('currentUserId');
    this.reservation = {
      id : 0,
      carId: this.car.id,
      userId: parseInt(this.userId),
      start: this.startDate,
      end: this.endDate,
      };
     

  }

  makeReservation()
  {
     this.reservationService.makeReservation(this.reservation).subscribe(
     (response) => {console.log('uspeh'); this.showSuccess("Your reservation has been successfully made."); this._location.back();},
     (error) => {console.log('neuspeh'); this.showError("It is not possible to confirm this reservation."); this._location.back();}
     )
  }

  cancelReservation()
  {
     this.reservationService.cancelReservation(this.currentReservation.id.toString()).subscribe(
     (response) => {console.log('uspeh');  this.showSuccess("Your reservation has been successfully cancelled."); this._location.back(); },
     (error) => {console.error('neuspeh');  this.showError("You can't cancel this reservation."); this._location.back();}
     )
  }

  abort()
  {
    this._location.back();
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!")
  }
  showError(message: string){
    this.toastr.error(message);
  }


}
