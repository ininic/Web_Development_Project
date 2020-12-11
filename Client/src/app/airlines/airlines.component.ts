import { Component, OnInit } from '@angular/core';
import { Airline } from '../model/airline';
import { Observable } from 'rxjs';
import { AirlineService } from '../services/airline.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {

  public airlines: Airline[];
 
  public airline: Airline; 
  constructor(private airlineService: AirlineService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.airlineService.getAirlines().subscribe((response) => { this.airlines = response; console.log('OBSERVE "response" RESPONSE is ', this.airlines);
 });
  } 

  


}
