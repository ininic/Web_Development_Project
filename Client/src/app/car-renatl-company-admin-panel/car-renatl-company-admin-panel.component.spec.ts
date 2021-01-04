import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRenatlCompanyAdminPanelComponent } from './car-renatl-company-admin-panel.component';

describe('CarRenatlCompanyAdminPanelComponent', () => {
  let component: CarRenatlCompanyAdminPanelComponent;
  let fixture: ComponentFixture<CarRenatlCompanyAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRenatlCompanyAdminPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRenatlCompanyAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
