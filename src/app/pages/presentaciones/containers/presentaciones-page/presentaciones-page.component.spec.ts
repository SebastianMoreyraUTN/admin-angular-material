import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionesPageComponent } from './presentaciones-page.component';

describe('PresentacionesPageComponent', () => {
  let component: PresentacionesPageComponent;
  let fixture: ComponentFixture<PresentacionesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
