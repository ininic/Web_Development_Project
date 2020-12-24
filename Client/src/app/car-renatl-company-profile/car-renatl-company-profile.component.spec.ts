import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRenatlCompanyProfileComponent } from './car-renatl-company-profile.component';

describe('CarRenatlCompanyProfileComponent', () => {
  let component: CarRenatlCompanyProfileComponent;
  let fixture: ComponentFixture<CarRenatlCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRenatlCompanyProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRenatlCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
