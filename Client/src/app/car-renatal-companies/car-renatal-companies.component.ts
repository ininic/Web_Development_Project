import { Component, Input, OnInit } from '@angular/core';
import { CarRentalCompany } from '../model/car-rental-company';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../model/car';
import { interval } from 'rxjs';
import { ViewChild, ElementRef } from '@angular/core';
import { _getOptionScrollPosition } from '@angular/material/core';
import { Console } from 'console';
import { ReservationService } from '../services/reservation.service';
import {Router} from '@angular/router'
import { CommunicationService } from '../services/comunication.service';


@Component({
  selector: 'app-car-renatal-companies',
  templateUrl: './car-renatal-companies.component.html',
  styleUrls: ['./car-renatal-companies.component.css']
})
export class CarRenatalCompaniesComponent implements OnInit {
 
  @ViewChild('target') private myScrollContainer: ElementRef;
  public scroll : number;
  public nameOfCompany: string;
  public mark: string;
  public companies: CarRentalCompany[];
  public searchedcars: Car[] = [];
  public company: CarRentalCompany; 
  public sortedByName: number;
  public sortedByAbout: number;
  public sortedByAddress: number;
  public cars: Car[];
  public searchedcarspom: Car[] = [];
  public car: Car; 
  public issearched: number;
  public numberOfSeats: number;
  public model: string;
  public selectedStartDate: Date;
  public selectedEndDate: Date;
  constructor(private communicationService: CommunicationService, private router: Router, private carservice: CarRentalCompanyService, private reservationService: ReservationService, private route: ActivatedRoute) { 
    this.nameOfCompany = "";
    this.mark = "";
    this.model = "";
    this.numberOfSeats = 0;
    this.selectedStartDate = null;
    this.selectedEndDate = null;
  
  }
 
  ngOnInit(): void {
    this.getCars();
    this.issearched = 0;
    this.scroll = 0;
     //interval(3000).subscribe(x => { // will execute every 30 seconds
     // this.getCars();
    //});
    this.carservice.getCompanies().subscribe((response) => { this.companies = response; console.log('OBSERVE "response" RESPONSE is ', this.companies);
 });
  }


 
  Redirect(car: Car)
  {
    this.communicationService.nextMessage(car)
    //localStorage.setItem('car', car.);
    //this.comunicationService.sendData(car);
    this.router.navigate(['/reservationdetails']);
  }

  sortByName(): void{
    if(this.sortedByName == -1)
    {
      this.companies.sort((a, b) => a.name.localeCompare(b.name));
      this.sortedByName = 1;
    }
    else{
      this.companies.sort((a, b) => b.name.localeCompare(a.name));
      this.sortedByName = - 1;
    }
  
  }
  sortByAbout(): void{
    if(this.sortedByAbout == -1)
    {
      this.companies.sort((a, b) => a.about.localeCompare(b.about));
      this.sortedByAbout = 1;
    }
    else{
      this.companies.sort((a, b) => b.about.localeCompare(a.about));
      this.sortedByAbout = - 1;
    }
  
  }

  sortByAddress(): void{
    if(this.sortedByAddress == -1)
    {
    this.companies.sort((a, b) => a.address.localeCompare(b.address));
    this.sortedByAddress = 1;
    }
    else{
      this.companies.sort((a, b) => b.address.localeCompare(a.address));
      this.sortedByAddress = - 1;
    }
  
  }

  getCars(): void{
    this.carservice.getCars().subscribe((response) => {this.cars = response; console.log('OBSERVE "response" RESPONSE is ', this.cars);})
  }



  Search() : void{
    
    if(this.selectedStartDate != null && this.selectedEndDate)
    {
      console.log('aaaaaa',this.selectedStartDate);
      console.log('bbbbb',this.selectedEndDate);
      this.reservationService.getIdOfAvailableCar(this.selectedStartDate, this.selectedEndDate).subscribe(
        (response) => {console.log('Available cars', response);
      
        this.searchedcars = response;
      this.basicSearch();
    },
        (error) => {}
        );
      
    }
    else{
      this.searchedcars = [];
      for (let entry of this.cars) {     
        this.searchedcars.push(entry);   
       }
       this.basicSearch();
    }
    
  }
  
  basicSearch(){

    //this.searchedcars = [];
    this.issearched = 1;  
    //let i = 0;
    
     // console.log('svi automobili:',  this.cars);
      console.log('svi automobili:',  this.searchedcars);

    if(this.nameOfCompany != "")
    {
        //i = 0;
        for (var i = 0; i < this.searchedcars.length; i++) {

          if(this.searchedcars[i].nameOfCompany.localeCompare(this.nameOfCompany) != 0 )
          {         
          this.searchedcars.splice(i, 1)    
          i--;
          }
         }
    }

    
    if(this.mark != "")
    {
      for (var i = 0; i < this.searchedcars.length; i++) {

        if(this.searchedcars[i].mark.localeCompare(this.mark) != 0 )
        {         
        this.searchedcars.splice(i, 1)    
        i--;
        }
      }
    }

    if(this.model != "")
    {
      for (var i = 0; i < this.searchedcars.length; i++) {

        if(this.searchedcars[i].model.localeCompare(this.model) != 0 )
        {         
        this.searchedcars.splice(i, 1)    
        i--;
        }
      }
    }

    if(this.numberOfSeats != 0)
    {
      for (var i = 0; i < this.searchedcars.length; i++) {

        if(this.searchedcars[i].numberOfSeats!= this.numberOfSeats )
        {         
        this.searchedcars.splice(i, 1)    
        i--;
        }
      }
    }

    
    this.scroll  = 1;

  }
  

 

  scrollOn(): void {
    // setTimeout(() => window.scroll(0,450),1000)
    if(this.scroll == 1){
      window.scroll(0,350);
      console.log("skrolujem");
      this.scroll = 0;
    }
  }

}
