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
import { DlYearModelProvider } from 'angular-bootstrap-datetimepicker';
import { getLocaleDateFormat } from '@angular/common';
import { CookieService} from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
  public searchedCompanies: CarRentalCompany[];
  public searchedcars: Car[] = [];
  public company: CarRentalCompany; 
  public sortedByName: number;
  public sortedByAbout: number;
  public sortedByAddress: number;

  public carSortedByMark: number;
  public carSortedByModel: number;
  public carSortedByNumberOfSeats: number;
  public carSortedByCompanyName: number;

  public cars: Car[];
  public searchedcarspom: Car[] = [];
  public car: Car; 
  public issearched: number;
  public numberOfSeats: number;
  public model: string;
  public selectedStartDate: Date;
  public selectedEndDate: Date;
  public startDate: string;
  public endDate: string;

  public state: string;
  public companyName: string;

   public cookieValue: string; 
   public role: string;

  constructor(private toastr: ToastrService, private cookieService: CookieService, private communicationService: CommunicationService, private router: Router, private carservice: CarRentalCompanyService, private reservationService: ReservationService, private route: ActivatedRoute) { 
    this.nameOfCompany = "";
    this.companyName = "";
    this.mark = "";
    this.model = "";
    this.numberOfSeats = 0;
    this.state = "car";
    this.cookieValue = this.cookieService.get('cookie-name');
    this.role = localStorage.getItem('role');
   // this.selectedStartDate = null;
   // this.selectedEndDate = null;

    var d = new Date();
    console.log('d na pocetku', d)
    d.setUTCHours(d.getHours());
    console.log('d posle', d)
   

   this.selectedStartDate =  new Date(d.toISOString().slice(0, 16));
   
    this.startDate = d.toISOString().slice(0, 16);
    console.log('string posle', this.startDate)
    d.setDate(d.getUTCDate() + 7)
    this.endDate = d.toISOString().slice(0, 16);
   this.selectedEndDate = new Date(d.toISOString().slice(0, 16));

   //document.getElementById("dateInput").min = '2019-02-17T10:38';
    //console.log(this.endDate )
    //console.log(this.startDate);
    //this.selectedStartDate = this.selectedStartDate.getTime();
    //this.selectedEndDate = Date.;
    //this.selectedEndDate = new Date;
   
  
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
    this.communicationService.nextCar(car)
    //localStorage.setItem('car', car.);
    //this.comunicationService.sendData(car);
    this.router.navigate(['/reservationdetails', this.startDate, this.endDate, 'add']);
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
    
    if(this.startDate != null || this.endDate != null)
    {
      this.selectedStartDate = new Date(this.startDate);
      var now = new Date();
      //now.setUTCHours(now.getHours());
      var nowstr = now.toISOString().slice(0, 16);    
      //da li je pocetno vreme proslo 
      if(this.selectedStartDate.valueOf() > now.valueOf())
      {
       //proveravamo da li razlika izmadju vremena pocetka rezervacije i trenutnog vremena veca od 1 sat
       //ako jeste sve je u redu, ako nije, kazemo korisniku da mora sat vremena ranije da rezervise
       if((this.selectedStartDate.valueOf() - now.valueOf())/1000 >= 3600)
       {    
      //pocetno vreme mora biti ranije od krajnjeg
      if(this.startDate<this.endDate)
      {
        this.selectedEndDate = new Date(this.endDate);
        this.selectedStartDate = new Date(this.startDate);
        var diff = this.selectedEndDate.valueOf() - this.selectedStartDate.valueOf();

        //razlika vremena izmedju pocetnog i krajnjeg mora biti min sat vremena
        if((diff/1000) > 3600){

        console.log('razlikaa', diff/1000);
        console.log('bbbbb',this.selectedEndDate);
        this.reservationService.getIdOfAvailableCar(this.startDate, this.endDate).subscribe(
          (response) => {
          console.log('Available cars', response);       
          this.searchedcars = response;
          this.basicSearch();
         },
          (error) => {}
        );
        } else{
          this.showWarning("1 hour is minimum amount of time.");
          this.searchedcars = [];
        }
        
      }
      else {
        this.showWarning("Pick-up time must be earlier than drop-off time");
        this.searchedcars = [];
      }
    } else{
      this.showWarning("You need to make reservation at least 1h before pick-up time");
      this.searchedcars = [];
    }

    }
    else{
      this.showWarning("Pick-up time is past!");
      this.searchedcars = [];
    }


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

  setState(state: string){
    this.state = state;
    console.log(this.state);
  }

  searchCompanies(){
    console.log('pretrazujem kompanije!');

    console.log(this.companyName);
    this.carservice.getCompanies().subscribe((response) => { this.companies = response; console.log('OBSERVE "response" RESPONSE is ', this.companies);

    if(this.companyName != "")
    {
        //i = 0;
        for (var i = 0; i < this.companies.length; i++) {
          console.log(this.companies[i].name);
          if(this.companies[i].name.localeCompare(this.companyName) != 0 )
          {         
          this.companies.splice(i, 1)    
          i--;
          }
         }
    }
  });
  }


  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(message: string){
    this.toastr.warning(message)
  }
  showError(){
    this.toastr.error("Error!")
  }

  //sortiranje automobila na osnovu marke
  sortCarsByMark(searched: string): void{

    if(searched == 'true'){
      if(this.carSortedByMark == -1)
      {
        this.searchedcars.sort((a, b) => a.mark.localeCompare(b.mark));
        this.carSortedByMark = 1;
      }
      else{
        this.searchedcars.sort((a, b) => b.mark.localeCompare(a.mark));
        this.carSortedByMark = - 1;
      }
    }
    else{
    console.log('Available aaaaaa');       
      if(this.carSortedByMark == -1)
      {
        this.cars.sort((a, b) => a.mark.localeCompare(b.mark));
        this.carSortedByMark = 1;
      }
      else{
        this.cars.sort((a, b) => b.mark.localeCompare(a.mark));
        this.carSortedByMark = - 1;
      }
    }
  }
  
  //sortiranje automobila na osnovu modela
  sortCarsByModel(searched: string): void{

    if(searched == 'true'){
      if(this.carSortedByModel == -1)
      {
        this.searchedcars.sort((a, b) => a.model.localeCompare(b.model));
        this.carSortedByModel = 1;
      }
      else{
        this.searchedcars.sort((a, b) => b.model.localeCompare(a.model));
        this.carSortedByModel = - 1;
      }
    }
    else{
    console.log('Available aaaaaa');       
      if(this.carSortedByModel == -1)
      {
        this.cars.sort((a, b) => a.model.localeCompare(b.model));
        this.carSortedByModel = 1;
      }
      else{
        this.cars.sort((a, b) => b.model.localeCompare(a.model));
        this.carSortedByModel = - 1;
      }
    }
  }

  //sortiranje automobila na osnovu broja sedista
  sortCarsBySeats(searched: string): void{

    if(searched == 'true'){
      if(this.carSortedByNumberOfSeats == -1)
      {
        this.searchedcars.sort((a, b) => a.numberOfSeats > b.numberOfSeats ? 1 : -1);
        this.carSortedByNumberOfSeats = 1;
      }
      else{
        this.searchedcars.sort((a, b) => a.numberOfSeats < b.numberOfSeats ? 1 : -1);
        this.carSortedByNumberOfSeats = - 1;
      }
    }
    else{
    console.log('Available aaaaaa');       
      if(this.carSortedByNumberOfSeats == -1)
      {
        this.cars.sort((a, b) => a.numberOfSeats > b.numberOfSeats ? 1 : -1);
        this.carSortedByNumberOfSeats = 1;
      }
      else{
        this.cars.sort((a, b) => a.numberOfSeats < b.numberOfSeats ? 1 : -1);
        this.carSortedByNumberOfSeats = - 1;
      }
    }
  }

  //sortiranje automobila na osnovu modela
  sortCarsByCompany(searched: string): void{

    if(searched == 'true'){
      if(this.carSortedByCompanyName == -1)
      {
        this.searchedcars.sort((a, b) => a.nameOfCompany.localeCompare(b.nameOfCompany));
        this.carSortedByCompanyName = 1;
      }
      else{
        this.searchedcars.sort((a, b) => b.nameOfCompany.localeCompare(a.nameOfCompany));
        this.carSortedByCompanyName = - 1;
      }
    }
    else{
    console.log('Available aaaaaa');       
      if(this.carSortedByCompanyName == -1)
      {
        this.cars.sort((a, b) => a.nameOfCompany.localeCompare(b.nameOfCompany));
        this.carSortedByCompanyName = 1;
      }
      else{
        this.cars.sort((a, b) => b.nameOfCompany.localeCompare(a.nameOfCompany));
        this.carSortedByCompanyName = - 1;
      }
    }
  }

}
