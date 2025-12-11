import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubCustomerDashboard2Component} from './sub-customer-dashboard2.component';

describe('SubCustomerDashboard2Component', () => {
  let component: SubCustomerDashboard2Component;
  let fixture: ComponentFixture<SubCustomerDashboard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCustomerDashboard2Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCustomerDashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
