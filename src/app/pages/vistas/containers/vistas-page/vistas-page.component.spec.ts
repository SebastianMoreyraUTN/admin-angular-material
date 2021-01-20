import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistasPageComponent } from './vistas-page.component';

describe('VistasPageComponent', () => {
  let component: VistasPageComponent;
  let fixture: ComponentFixture<VistasPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistasPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
