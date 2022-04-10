import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveActivityOrderComponent } from './approve-activity-order.component';

describe('ApproveActivityOrderComponent', () => {
  let component: ApproveActivityOrderComponent;
  let fixture: ComponentFixture<ApproveActivityOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveActivityOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveActivityOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
