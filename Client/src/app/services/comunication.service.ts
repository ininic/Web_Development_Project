import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Car } from '../model/car';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommunicationService {

    private message = new BehaviorSubject(new Car);
    sharedMessage = this.message.asObservable();
    constructor() { }
 
    private emitChangeSource = new Subject<any>();

    changeEmitted$ = this.emitChangeSource.asObservable();

    emitChange(data: {}) {
        this.emitChangeSource.next(data);
    }

    nextMessage(car: Car) {
        this.message.next(car)
      }
}