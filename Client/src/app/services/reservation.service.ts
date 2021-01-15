import { Injectable } from '@angular/core';
import { Airline } from '../model/airline';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }


  getIdOfAvailableCar(start: Date, end: Date) : Observable<Car[]> {
    //console.log('OOOOOk' + name);
    return this.http.get<Car[]>('https://localhost:44325/api/reservation/'+ start + '/' + end);    
    }
}
