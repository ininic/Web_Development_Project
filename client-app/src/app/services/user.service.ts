import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'
import { User } from '../../app/model/user';

import { Observable } from 'rxjs';
import { LoginParameters } from '../model/login-parameters';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { 

      
  }

  logInaaa(query: number) : Observable<string>{
    return this.http.get(`https://localhost:44325/api/users/${query}` , {responseType: 'text'});    
  }

  
}
