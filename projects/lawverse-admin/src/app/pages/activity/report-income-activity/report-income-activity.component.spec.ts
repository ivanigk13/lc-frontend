import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncomeActivityComponent } from './report-income-activity.component';

describe('ReportIncomeActivityComponent', () => {
  let component: ReportIncomeActivityComponent;
  let fixture: ComponentFixture<ReportIncomeActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportIncomeActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncomeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
