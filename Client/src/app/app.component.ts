import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client-app';
  
  constructor(private cookieService: CookieService) {}
  public ngOnInit(): void {
    
   
  }

}
