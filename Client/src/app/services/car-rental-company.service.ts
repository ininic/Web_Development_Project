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
    console.log('Preuzimanje svih rentacar servisa');
    return this.http.get<CarRentalCompany[]>('https://localhost:44325/api/carrentalcompany');   
  }
  
  getCompany(id: string, name: string) : Observable<CarRentalCompany> {
    return this.http.get<CarRentalCompany>('https://localhost:44325/api/carrentalcompany/'+ id + '/' + name);    
  }

  getCompanyCars(id: string, carId: string) :  Observable<Car[]> {
    return this.http.get<Car[]>('https://localhost:44325/api/car/'+ id + '/' + carId); 
  }

  getCars(): Observable<Car[]>
  {
    return this.http.get<Car[]>('https://localhost:44325/api/car'); 
  }

  editCompany(company:CarRentalCompany): Observable<any>{
    return this.http.put('https://localhost:44325/api/CarRentalCompany/1/', company)
  }

  deleteCar(id: string): Observable<any>{
    return this.http.delete('https://localhost:44325/api/car/'+ id);
  }

  addCar(car: Car): Observable<any>{
    return this.http.post('https://localhost:44325/api/car/', car);
  }

  editCar(id: string, car: Car): Observable<any>{
    return this.http.put('https://localhost:44325/api/car/'+ id + '/', car );
  }

  getCarById(id:string): Observable<Car>{
    return this.http.get<Car>('https://localhost:44325/api/car/byCarId' + id);
  }

  addCarRentalCompany(company: CarRentalCompany): Observable<any>{
    return this.http.post('https://localhost:44325/api/CarRentalCompany/', company)
  }

  deleteCompany(id: string): Observable<any>{
    return this.http.delete('https://localhost:44325/api/CarRentalCompany/'+ id);
  }

} 
