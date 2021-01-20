import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillDownColumnBarComponent } from './drill-down-column-bar.component';

describe('DrillDownColumnBarComponent', () => {
  let component: DrillDownColumnBarComponent;
  let fixture: ComponentFixture<DrillDownColumnBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrillDownColumnBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillDownColumnBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
