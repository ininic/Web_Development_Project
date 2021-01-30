import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserService {

  public role: string;
  constructor(private router: Router) { }

  canActivate(){
    const jwtHelper = new JwtHelperService();
    const token =  localStorage.getItem('jwt');
    this.role = localStorage.getItem('role');
    if(token && this.role == "user"){
      return true;
    }
    else if(token && !jwtHelper.isTokenExpired(token))
    {
      this.router.navigate(['home']);
      return true;
    }
    this.router.navigate(['login']);
    return false;
  
  }

}
