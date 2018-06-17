import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionDepictsComponent } from './contribution-depicts.component';

describe('ContributionDepictsComponent', () => {
  let component: ContributionDepictsComponent;
  let fixture: ComponentFixture<ContributionDepictsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionDepictsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionDepictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
