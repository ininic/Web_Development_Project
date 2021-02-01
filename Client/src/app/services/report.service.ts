import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }


  getReport(companyId: string, companyName: string) : Observable<string> {
    return this.http.get<string>('https://localhost:44325/api/report/'+ companyId + '/' + companyName);    
  }

}
