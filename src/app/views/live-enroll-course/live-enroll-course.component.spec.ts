import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEnrollCourseComponent } from './live-enroll-course.component';

describe('LiveEnrollCourseComponent', () => {
  let component: LiveEnrollCourseComponent;
  let fixture: ComponentFixture<LiveEnrollCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveEnrollCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveEnrollCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
