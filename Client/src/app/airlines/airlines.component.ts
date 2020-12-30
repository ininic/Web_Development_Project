import { Component, OnInit } from '@angular/core';
import { Airline } from '../model/airline';
import { Observable } from 'rxjs';
import { AirlineService } from '../services/airline.service';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {

  public airlines: Airline[];
  public airline: Airline; 
  public sortetByName: number;
  public sortetByAbout: number;
  public sortetByRating: number;
  constructor(private airlineService: AirlineService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   /* interval(3000).subscribe(x => { // will execute every 30 seconds
      this.getData();
    });*/
    this.airlineService.getAirlines().subscribe((response) => { this.airlines = response; console.log('OBSERVE "response" RESPONSE is ', this.airlines);
 });
  } 

  sortByName(): void{
    if(this.sortetByName == -1)
    {
      this.airlines.sort((a, b) => a.name.localeCompare(b.name));
      this.sortetByName = 1;
    }
    else{
      this.airlines.sort((a, b) => b.name.localeCompare(a.name));
      this.sortetByName = - 1;
    }
  
  }
  sortByAbout(): void{
    if(this.sortetByAbout == -1)
    {
      this.airlines.sort((a, b) => a.about.localeCompare(b.about));
      this.sortetByAbout = 1;
    }
    else{
      this.airlines.sort((a, b) => b.about.localeCompare(a.about));
      this.sortetByAbout = - 1;
    }
  
  }

  sortByRating(): void{
    if(this.sortetByRating == -1)
    {
    this.airlines.sort((a, b) => a.rating > b.rating ? 1 : -1);
    this.sortetByRating = 1;
    }
    else{
      this.airlines.sort((a, b) =>  a.rating < b.rating ? 1 : -1);
      this.sortetByRating = - 1;
    }
  
  }

  getData():void{
    this.airlineService.getAirlines().subscribe((response) => { this.airlines = response; console.log('OBSERVE "response" RESPONSE is ', this.airlines); });
  }
 

}
