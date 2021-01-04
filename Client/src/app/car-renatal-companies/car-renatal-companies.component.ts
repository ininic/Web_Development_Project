import { Component, Input, OnInit } from '@angular/core';
import { CarRentalCompany } from '../model/car-rental-company';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../model/car';
import { interval } from 'rxjs';
import { ViewChild, ElementRef } from '@angular/core';
import { _getOptionScrollPosition } from '@angular/material/core';


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
  public car: Car; 
  public issearched: number;
  constructor(private carservice: CarRentalCompanyService, private route: ActivatedRoute) { 
    this.nameOfCompany = "";
    this.mark = "";
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
   
    this.searchedcars = [];
    let i = 0;
    this.issearched = 1;  
    if(this.nameOfCompany != "" && this.mark != "")
    {
      for (let entry of this.cars) {

        console.log(entry);
        if(entry.nameOfCompany.localeCompare(this.nameOfCompany) == 0 && entry.mark.localeCompare(this.mark) == 0  )
        {
          
          this.searchedcars.push(entry);
          i++;
        }
      }
    }
    else if(this.nameOfCompany != "" && this.mark == "")
    {
      i = 0;
        for (let entry of this.cars) {
  
          console.log(entry);
          if(entry.nameOfCompany.localeCompare(this.nameOfCompany) == 0 )
          {
            
            this.searchedcars.push(entry);
            i++;
          }
        }
      
    }
    else if(this.nameOfCompany == "" && this.mark != "")
    {
      i = 0;
        for (let entry of this.cars) {
  
          console.log(entry);
          if(entry.mark.localeCompare(this.mark) == 0 )
          {
            
            this.searchedcars.push(entry);
            i++;
          }
        }
      
    }
    else{
      i = 0;
      for (let entry of this.cars) {

        
          this.searchedcars.push(entry);
          i++;
        
      }
    }
    




    console.log('srcovani' + this.searchedcars);
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
