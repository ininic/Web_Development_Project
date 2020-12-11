import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Airline } from '../model/airline';
import { AirlineService } from '../services/airline.service';

@Component({
  selector: 'app-airline-profile',
  templateUrl: './airline-profile.component.html',
  styleUrls: ['./airline-profile.component.css']
})
export class AirlineProfileComponent implements OnInit {
  public airline: Airline; 
  public id: string;
  public name: string;
  public about: string;
  public rating: number;
  constructor(private airlineService: AirlineService, private route: ActivatedRoute) { 
    
  }
  ngOnChanges(): void{
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {this.id = params.get('id'); console.log(params.get('id')) });
    this.airlineService.getAirline(this.id).subscribe((response) => { this.airline = response; console.log('OBSERVE "response" RESPONSE is ', this.airline);
    this.name = this.airline.name;
  this.about = this.airline.about;
  this.rating = this.airline.rating;
  });
  
  }

}
