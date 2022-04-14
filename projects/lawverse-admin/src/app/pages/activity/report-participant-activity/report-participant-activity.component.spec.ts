import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportParticipantActivityComponent } from './report-participant-activity.component';

describe('ReportParticipantActivityComponent', () => {
  let component: ReportParticipantActivityComponent;
  let fixture: ComponentFixture<ReportParticipantActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportParticipantActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportParticipantActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
