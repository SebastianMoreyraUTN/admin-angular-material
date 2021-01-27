import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualMultiselectComponent } from './dual-multiselect.component';

describe('DualMultiselectComponent', () => {
  let component: DualMultiselectComponent;
  let fixture: ComponentFixture<DualMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
