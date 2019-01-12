import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigDetailComponent } from './gig-detail.component';

describe('GigDetailComponent', () => {
  let component: GigDetailComponent;
  let fixture: ComponentFixture<GigDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
