import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(){
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('jwt');
    if(token && !jwtHelper.isTokenExpired(token)){
      console.log('tooookeeeeen');
      return true;
    }
    this.router.navigate(['login']);
    return false;
  
  }
}
