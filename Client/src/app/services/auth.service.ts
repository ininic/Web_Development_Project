import { Injectable } from '@angular/core';
import { LoginParameters } from '../model/login-parameters';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  logIn(logparam: LoginParameters) : Observable<any>{

    const headers: HttpHeaders = new  HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    

    return this.http.post('https://localhost:44325/api/login/', logparam, { headers: headers , });
  }
}
