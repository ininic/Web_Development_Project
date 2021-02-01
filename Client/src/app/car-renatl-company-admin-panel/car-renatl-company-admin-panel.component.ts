import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarRentalCompany } from '../model/car-rental-company';
import { CarRentalCompanyService } from '../services/car-rental-company.service';
import { CommunicationService } from '../services/comunication.service';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-car-renatl-company-admin-panel',
  templateUrl: './car-renatl-company-admin-panel.component.html',
  styleUrls: ['./car-renatl-company-admin-panel.component.css']
})
export class CarRenatlCompanyAdminPanelComponent implements OnInit {

  public company: CarRentalCompany; 
  public cars: Car[];
  public id: string;
  public companyName: string;
  public companyId: string;

  public allcars: string;
  public bookedCars: string;
  public availableCars: string;

  public lastWeekReservations: string;
  public lastMonthReservations: string;
  public lastYearReservations: string;

  public lastWeekBookedTime: string;
  public lastMonthBookedTime: string;
  public lastYearBookedTime: string;

  public answer: string;

  constructor(private toastr: ToastrService, private _communicationService: CommunicationService, private carService: CarRentalCompanyService, private reportService: ReportService) {
    this.companyName = localStorage.getItem('companyName');
    this.companyId = localStorage.getItem('companyId');
   }

  ngOnInit(): void {
    this.company = {
      name: '',
      address: '',
      about: '',
      priceList: '',
      id: 1,
      branches: '', 
      rating: 0,
      ratingCounter: 0,
      };

      this.allcars = '';
      this.bookedCars = '';
      this.availableCars = '';

      this.lastWeekReservations = '';
      this.lastMonthReservations = ''; 
      this.lastYearReservations = '';
      
      this.lastWeekBookedTime = '';
      this.lastMonthBookedTime = '';
      this.lastYearBookedTime = '';
    //prvi put kada se komponenta ucitava, tada se uzima kompanija preko imena
    //drugi put to se radi preko sacuvanog id-ja zbog toga sto je moguce, da je 
    //neko ko koristi isti nalog sa druge sesije u medjuvremenu u bazi izmenio ime kompanije
    if(this.companyId == "")
    {
      //preuzimanje izvestaja
      this.reportService.getReport('0',this.companyName).subscribe(
        (response) => {this.answer = response; console.log('Answer:',this.answer);
        var str = this.answer+ '';
        var splitted = str.split("#", 9); 
        this.allcars = splitted[0];
        this.bookedCars = splitted[1];
        this.availableCars = splitted[2];
        this.lastWeekReservations = splitted[3];
        this.lastMonthReservations = splitted[4]; 
        this.lastYearReservations = splitted[5];
        this.lastWeekBookedTime = splitted[6];
        this.lastMonthBookedTime = splitted[7];
        this.lastYearBookedTime = splitted[8];
        },
        (error) => {console.error(error);});

      this.carService.getCompany('000',this.companyName).subscribe((response) => 
      {   
      this.company = response; 
      localStorage.setItem('companyId', this.company.id.toString());
      this.getCars(this.company.id.toString());
      console.log('OBSERVE "response" RESPONSE is ', this.company);
      this.carService.getCompanyCars(this.company.id.toString(), "000").subscribe((response) => {this.cars = response; console.log('OBSERVE "response" RESPONSE is ', this.cars);})
      });
    }
    else{
      //preuzimanje izvestaja
      this.reportService.getReport(this.companyId,"000").subscribe(
        (response) => {this.answer = response; console.log('Answer:',this.answer);
        var str = this.answer + '';
        var splitted = str.split("#", 9); 
        this.allcars = splitted[0];
        this.bookedCars = splitted[1];
        this.availableCars = splitted[2];
        this.lastWeekReservations = splitted[3];
        this.lastMonthReservations = splitted[4]; 
        this.lastYearReservations = splitted[5];
        this.lastWeekBookedTime = splitted[6];
        this.lastMonthBookedTime = splitted[7];
        this.lastYearBookedTime = splitted[8];
        },
        (error) => {console.error(error);});

      this.carService.getCompany(this.companyId,"000").subscribe((response) => 
      {   
      this.company = response; 
      this.getCars(this.company.id.toString());
      console.log('OBSERVE "response" RESPONSE is ', this.company);
      this.carService.getCompanyCars(this.company.id.toString(), "000").subscribe((response) => {this.cars = response; console.log('OBSERVE "response" RESPONSE is ', this.cars);})
      });
    }
  }

  //izmena podataka o kompaniji
  onEditCompany(editedForm){
    if(editedForm.valid){   
      this.carService.editCompany(this.company).subscribe(
        (response) => { 
          console.log('Kad menjam ovo je ime', this.company.name);
          localStorage.setItem('companyName', this.company.name);
          this.showSuccess("You have successfully updated information about company!")
        },
        (error) => { console.error(error);}
      );
    } 
    else {
     this.showWarning();
    }
  }

  //dobavljanje automobila za datu kompaniju
  getCars(id: string)
  {
    this.carService.getCompanyCars(id, "000").subscribe(
      (response) => {  this.cars = response;  console.log('Evo ih' + this.cars);},
      (error) => { console.error(error); }
    )
  }

  //brisanje automobila
  //desice se problem, ako izbrisemo automobil koji jos uvek nije ocenjen u nekoj rezervaciji
  //korisnik nece moci da oceni ni automobil ni kompaniju(jer se preko imena kompanije iz automobila, trazi kompanije(eventualno izmeniti model)) iz te rezervacije
  //ideja za laksu ispravku: implementirati logicko, a ne fizicko brisanje automobila iz baze
  onDeleteCar(id: string){
    this.carService.deleteCar(id).subscribe(
      (response) => { 
        console.log('Automobil izbrisan');
        this.getCars(this.company.id.toString());
        this.showSuccess("You have successfully deleted car!")
      },
      (error) => {
        console.error('Neuspelo'); 
        this.showError();

      }
    ); 
  }
  
  //toastr poruke za korisnika
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showWarning(){
    this.toastr.warning("Please fill in all the required fields!")
  }
  showError(){
    this.toastr.error("Login failed: Invalid username or password.")
  }

}
