
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  //ubacivanje jwt-a u svaki http zahtev koji ide ka serveru
  //ovo će omogućiti autorizaciju i autentifikaciju na servru
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt'); // preuzimanja jwt-a iz localStorage-a

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      })
    });

    return next.handle(req1);
  }

}