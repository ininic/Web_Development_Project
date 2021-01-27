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

  getUserData(id: string, username: string): Observable<User>{
    return this.http.get<User>('https://localhost:44325/api/users/'+ id +'/'+ username);
  }

  editUserData(id: string, user: User): Observable<any>{
    return this.http.put('https://localhost:44325/api/users/'+ id +'/', user );
  }

  addAdmin(user: User): Observable<any>{
    return this.http.post('https://localhost:44325/api/users/', user);
  }
  getUsersByRole(role: string): Observable<User[]>{
    return this.http.get<User[]>('https://localhost:44325/api/administrator/' + role);
  }
}
