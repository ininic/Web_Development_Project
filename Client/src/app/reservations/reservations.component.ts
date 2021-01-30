import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { Reservation } from '../model/reservation';
import { CommunicationService } from '../services/comunication.service';
import { ReservationService } from '../services/reservation.service';
import {Router} from '@angular/router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  flags: boolean[];
  carRatingFlags: boolean[];
  companyRatingFlags: boolean[];
  cars: Car[];
  currentUserId: string;
  public pickupDate: Date;
  public currentCarRates: number [];
  public currentCompanyRates: number [];
  constructor(private toastr: ToastrService, private reservationService: ReservationService, private communicationService: CommunicationService, private router: Router) {
    this.currentUserId = localStorage.getItem('currentUserId');
    this.flags = [];
    this.currentCarRates = [];
    this.currentCompanyRates = [];
    this.carRatingFlags = [];
    this.companyRatingFlags = [];
   }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservationService.getResrvations(this.currentUserId).subscribe(
    (response) => {
      this.reservations = response.listOfReservations; this.cars = response.listOfCars; console.log(this.reservations);
      //prolazi se kroz sve rezervacije za one cije je pocetno vreme proslo, postavlja se true flag
      //koji ce se kasnije koristiti da se za te rezervacije onemoguci otkazivanje
      for (var i = 0; i < this.reservations.length; i++)
      {
        this.currentCarRates[i] = 0;
        this.currentCompanyRates[i] = 0;

        //sve rezervacije su inicijalno neocenjene
        this.carRatingFlags[i] = false;
        this.companyRatingFlags[i] = false;

        var now = new Date();
        this.pickupDate = new Date(this.reservations[i].start);
        if((this.pickupDate.valueOf() - now.valueOf())/1000 > 3600)
        {
          //ako je startno vreme rezervacije minimum 1 čas udaljeno od sadašnjeg trenutka, rezervacija se može otkazati
          this.flags[i] = true;
          console.log('tacno');
        }
        else{
          //ako je startno vreme rezervacije udaljeno manje od 60 minuta od sadašnjeg trenutka, rezervacija se više ne može otkazati
          this.flags[i] = false;
          console.log('netacno', this.flags[i]);
        }

      }
      console.log(this.flags);
    },
    (error) => {console.error('Doslo je do greške pri preuzimanju rezervacija sa servera!');}

    )
  }

  //funkcija kojom se prelazi na stranicu za potvrdu otkazivanja rezervacije
  Redirect(car: Car, reservation: Reservation)
  {
    this.communicationService.nextCar(car)
    this.communicationService.nextReservation(reservation);
    this.router.navigate(['/reservationdetails', reservation.start, reservation.end, 'delete']);
  }

  //funkcija za ocenjivanje automobila iz date rezervacije
  rateCar(rate: number, rb: number){
    this.carRatingFlags[rb] = true;
    console.log(rate,this.reservations[rb].carId, this.reservations[rb].id );
    this.reservationService.rateCar(this.reservations[rb].carId, this.reservations[rb].id, rate).subscribe(
      (response) => {console.log('uspeh'); this.showSuccess('You have successfully rated a car.');},
      (error) => {console.log('neuspeh'); this.showError('You have already rated this car.'); }
    )
  }

  //funkcija za ocenjivanje rentacar kompanije iz date rezervacije
  rateCompany(rate: number, rb: number){
    this.companyRatingFlags[rb] = true;
    console.log(rate);
    this.reservationService.rateCompany(this.reservations[rb].carId, this.reservations[rb].id, rate).subscribe(
      (response) => {console.log('uspeh'); this.showSuccess('You have successfully rated a company.'); },
      (error) => {console.log('neuspeh'); this.showError('You have already rated this company.'); }
    )
   
  }

  //toastr poruke za korisnika
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!");
  }
  showError(message: string){
    this.toastr.error(message);
  }


}
