import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReportesComponent } from './form-reportes.component';

describe('FormReportesComponent', () => {
  let component: FormReportesComponent;
  let fixture: ComponentFixture<FormReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
