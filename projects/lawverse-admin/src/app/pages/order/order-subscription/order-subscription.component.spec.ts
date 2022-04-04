import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSubscriptionComponent } from './order-subscription.component';

describe('OrderSubscriptionComponent', () => {
  let component: OrderSubscriptionComponent;
  let fixture: ComponentFixture<OrderSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
