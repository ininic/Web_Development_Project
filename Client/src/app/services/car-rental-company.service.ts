import { Injectable } from '@angular/core';
import { CarRentalCompany } from '../model/car-rental-company';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Car } from '../model/car';
@Injectable({
  providedIn: 'root'
})
export class CarRentalCompanyService {

  constructor(private http: HttpClient) { }

  getCompanies() : Observable<CarRentalCompany[]> {
    console.log('aaaa222');
    return this.http.get<CarRentalCompany[]>('https://localhost:44325/api/carrentalcompany');   
    }

    
  getCompany(id: string) : Observable<CarRentalCompany> {
    console.log('aaaa222');
    return this.http.get<CarRentalCompany>('https://localhost:44325/api/carrentalcompany/'+ id);    
    }

  getCompanyCars(id: string) :  Observable<Car[]> {
    return this.http.get<Car[]>('https://localhost:44325/api/car/'+ id); 
  }

  getCars(): Observable<Car[]>
  {
    return this.http.get<Car[]>('https://localhost:44325/api/car'); 
  }
}
