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
  public userId: string;
  constructor(private reservationService: ReservationService, private _location: Location, private route: ActivatedRoute, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {this.startDate = params.get('start'); this.endDate = params.get('end');  console.log(params.get('id')) });
    this.communicationService.sharedMessage.subscribe(message => this.car = message)
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
     (response) => {console.log('uspeh');},
     (error) => {console.log('neuspeh');}
     )
  }

  abort()
  {
    this._location.back();
  }
}
