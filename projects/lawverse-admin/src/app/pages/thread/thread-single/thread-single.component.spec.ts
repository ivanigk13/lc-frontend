import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSingleComponent } from './thread-single.component';

describe('ThreadSingleComponent', () => {
  let component: ThreadSingleComponent;
  let fixture: ComponentFixture<ThreadSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
