import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderActivityComponent } from './order-activity.component';

describe('OrderActivityComponent', () => {
  let component: OrderActivityComponent;
  let fixture: ComponentFixture<OrderActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
