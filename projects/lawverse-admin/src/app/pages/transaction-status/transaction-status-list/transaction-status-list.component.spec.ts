import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatusListComponent } from './transaction-status-list.component';

describe('TransactionStatusListComponent', () => {
  let component: TransactionStatusListComponent;
  let fixture: ComponentFixture<TransactionStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
