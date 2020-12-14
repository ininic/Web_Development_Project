import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/comunication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private _communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  
  onSomething() {
    this._communicationService.emitChange({proprty: 'value'});
}
}
