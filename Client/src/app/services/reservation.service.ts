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
}
