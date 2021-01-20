import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Car } from '../model/car';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from '../model/reservation';

@Injectable()
export class CommunicationService {

    private message = new BehaviorSubject(new Car);
    sharedMessage = this.message.asObservable();

    private message2 = new BehaviorSubject(new Reservation);
    sharedMessage2 = this.message2.asObservable();
    constructor() { }
 
    private emitChangeSource = new Subject<any>();

    changeEmitted$ = this.emitChangeSource.asObservable();

    emitChange(data: {}) {
        this.emitChangeSource.next(data);
    }

    nextCar(car: Car) {
        this.message.next(car)
      }

    nextReservation(reservation: Reservation) {
        this.message2.next(reservation)
      }
}