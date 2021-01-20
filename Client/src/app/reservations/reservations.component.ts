import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { Reservation } from '../model/reservation';
import { CommunicationService } from '../services/comunication.service';
import { ReservationService } from '../services/reservation.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  cars: Car[];
  currentUserId: string;
  constructor(private reservationService: ReservationService, private communicationService: CommunicationService, private router: Router) {
    this.currentUserId = localStorage.getItem('currentUserId');
   }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservationService.getResrvations(this.currentUserId).subscribe(
    (response) => {this.reservations = response.listOfReservations; this.cars = response.listOfCars; console.log(this.reservations);},
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
}
