import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAdminPanelComponent } from './airline-admin-panel.component';

describe('AirlineAdminPanelComponent', () => {
  let component: AirlineAdminPanelComponent;
  let fixture: ComponentFixture<AirlineAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineAdminPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
