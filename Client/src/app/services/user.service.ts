import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'
import { User } from '../../app/model/user';

import { Observable } from 'rxjs';
import { LoginParameters } from '../model/login-parameters';
import { tokengGetter } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { 

      
  } 

  logInaaa() : Observable<any>{
    console.log('poziv');
    return this.http.get("https://localhost:44325/api/values");    
  }

  Register(user: User) : Observable<any>{
    const headers: HttpHeaders = new  HttpHeaders();
    console.log('poziv');
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    

    return this.http.post('https://localhost:44325/api/registration/', user, { headers: headers , });
  }

  getUserData(username: String): Observable<User>{
    return this.http.get<User>('https://localhost:44325/api/users/'+ username);
  }
}
