import { Injectable } from '@angular/core';
import { Airline } from '../model/airline';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Car } from '../model/car';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }


  getIdOfAvailableCar(start: string, end: string) : Observable<Car[]> {
    //console.log('OOOOOk' + name);
    return this.http.get<Car[]>('https://localhost:44325/api/reservation/'+ start + '/' + end);    
    }
  
  makeReservation(reservation: Reservation): Observable<any>{
    return this.http.post('https://localhost:44325/api/reservation/', reservation);
  }

  getResrvations(userId: string): Observable<any> {
    return this.http.get<any>('https://localhost:44325/api/AdditionalQuery/' + userId); 
  }

  cancelReservation(id: string): Observable<any>{
    return this.http.delete('https://localhost:44325/api/reservation/'+ id);
  }
  rateCar(carId: number, reservationId: number, newCarRating: number): Observable<any>{
    return this.http.put('https://localhost:44325/api/reservation/'+ carId +'/' + reservationId + '/', newCarRating);
   
  }

  rateCompany(carId: number, reservationId: number, newCarRating: number): Observable<any>{
    return this.http.put('https://localhost:44325/api/AdditionalQuery/'+ carId +'/' + reservationId + '/', newCarRating);
   
  }
}
