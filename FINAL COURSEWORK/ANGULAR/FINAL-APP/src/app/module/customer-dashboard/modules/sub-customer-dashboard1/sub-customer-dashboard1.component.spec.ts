import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubCustomerDashboard1Component} from './sub-customer-dashboard1.component';

describe('SubCustomerDashboard1Component', () => {
  let component: SubCustomerDashboard1Component;
  let fixture: ComponentFixture<SubCustomerDashboard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCustomerDashboard1Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCustomerDashboard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
