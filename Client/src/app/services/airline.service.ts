import { Injectable } from '@angular/core';
import { Airline } from '../model/airline';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private http: HttpClient) { }

  getAirlines() : Observable<Airline[]> {
    console.log('aaaa222');
    return this.http.get<Airline[]>('https://localhost:44325/api/airline');
   
    }
}

