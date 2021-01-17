import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car';
import { CommunicationService } from '../services/comunication.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  //message:string;
  public car: Car;
  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.sharedMessage.subscribe(message => this.car = message)
  }

  a()
  {
     
  }

}
