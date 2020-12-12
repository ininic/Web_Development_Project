import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRenatalCompaniesComponent } from './car-renatal-companies.component';

describe('CarRenatalCompaniesComponent', () => {
  let component: CarRenatalCompaniesComponent;
  let fixture: ComponentFixture<CarRenatalCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRenatalCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRenatalCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
