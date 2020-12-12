import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onTestCall() {
    this.userService.logInaaa().subscribe((response) => { console.log(response);});
  }

}
