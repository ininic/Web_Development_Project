import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { Reservation } from '../model/reservation';
import { CommunicationService } from '../services/comunication.service';
import { ReservationService } from '../services/reservation.service';
import {Router} from '@angular/router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

enum ReservationState {
  Cancelable,
  NotCancelable,
  InProgress,
  Finished
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {

  reservationsState : ReservationState [];
  inProgress : boolean[];
  reservations: Reservation[];
  carRatingFlags: boolean[];
  companyRatingFlags: boolean[];
  cars: Car[];
  currentUserId: string;
  public pickupDate: Date;
  public dropoffDate: Date;
  public currentCarRates: number [];
  public currentCompanyRates: number [];
  public sortedByState: number;
  constructor(private toastr: ToastrService, private reservationService: ReservationService, private communicationService: CommunicationService, private router: Router) {
    this.currentUserId = localStorage.getItem('currentUserId');
    this.currentCarRates = [];
    this.currentCompanyRates = [];
    this.carRatingFlags = [];
    this.companyRatingFlags = [];
    this.reservationsState = [];
    this.sortedByState = 1;
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
        //sve rezervacije su inicialno otkazive
        this.reservationsState[i] = ReservationState.Cancelable;

        //svi automobili i kompanije inicialno nemaju ocene(tj. ocena je 0, dakle nepostojeca)
        this.currentCarRates[i] = 0;
        this.currentCompanyRates[i] = 0;

        //sve rezervacije su inicijalno neocenjene
        this.carRatingFlags[i] = false;
        this.companyRatingFlags[i] = false;

        //sadasnji trenutak u vremenu 
        var now = new Date();
        //vremena pocetka i zavrsetka rezervacije
        this.pickupDate = new Date(this.reservations[i].start);
        this.dropoffDate = new Date(this.reservations[i].end);
        if((this.pickupDate.valueOf() - now.valueOf())/1000 < 3600)
        {
          //ako je startno vreme rezervacije  udaljeno manje od 1 čas od sadašnjeg trenutka, rezervacija se ne može otkazati
          this.reservationsState[i] = ReservationState.NotCancelable;
          if((this.pickupDate.valueOf() - now.valueOf()) < 0 )
          {
            //ako je pocetno vreme rezervacije ranije od sadasenjeg trenutka, to znaci da je iznajmljivanje automobila u toku
            this.reservationsState[i] = ReservationState.InProgress;
            if((this.dropoffDate.valueOf() - now.valueOf()) < 0)
            {
              //ako je i zavrsno vreme rezervacje ranije od sadašnjeg trenutka, to znači da je iznajmljivanje završeno
              this.reservationsState[i] = ReservationState.Finished;
            }
          }
        }
       
      }       
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


  //Sortiranje liste rezervacija na osnovu trenutnog statusa rezervacije
  //Sortira se na osnovu niza reservationsState dok se paralelno sa 
  //sortiranjem elemenata ovog niza sortiraju i elementi nizova reservations i cars 

  sortByState(): void{
    if(this.sortedByState == 1)
    {
      for(var i = 0; i < this.reservationsState.length; i++)
      {
        for(var j = i; j < this.reservationsState.length; j++)
        {
          if(this.reservationsState[i] <= this.reservationsState[j])
          {
            var pom = this.reservationsState[i];
            this.reservationsState[i] = this.reservationsState[j];
            this.reservationsState[j] = pom;

            var pomRes = this.reservations[i];
            this.reservations[i] = this.reservations[j];
            this.reservations[j] = pomRes;

            var pomCar = this.cars[i];
            this.cars[i] = this.cars[j];
            this.cars[j] = pomCar;
          }
        }
      }
      //console.log(this.reservations, this.reservationsState);
      this.sortedByState = -1;
    } 
    else {
      for(var i = 0; i < this.reservationsState.length; i++)
      {
        for(var j = i; j < this.reservationsState.length; j++)
        {
          if(this.reservationsState[i] >= this.reservationsState[j])
          {
            var pom = this.reservationsState[i];
            this.reservationsState[i] = this.reservationsState[j];
            this.reservationsState[j] = pom;

            var pomRes = this.reservations[i];
            this.reservations[i] = this.reservations[j];
            this.reservations[j] = pomRes;

            var pomCar = this.cars[i];
            this.cars[i] = this.cars[j];
            this.cars[j] = pomCar;
          }
        }
      }
      //console.log(this.reservations, this.reservationsState);
      this.sortedByState = 1;
    }
   
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
