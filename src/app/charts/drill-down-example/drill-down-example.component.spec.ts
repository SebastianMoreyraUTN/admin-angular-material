import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillDownExampleComponent } from './drill-down-example.component';

describe('DrillDownExampleComponent', () => {
  let component: DrillDownExampleComponent;
  let fixture: ComponentFixture<DrillDownExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrillDownExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillDownExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
