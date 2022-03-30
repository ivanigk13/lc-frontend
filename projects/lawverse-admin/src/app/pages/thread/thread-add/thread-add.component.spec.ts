import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadAddComponent } from './thread-add.component';

describe('ThreadAddComponent', () => {
  let component: ThreadAddComponent;
  let fixture: ComponentFixture<ThreadAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
