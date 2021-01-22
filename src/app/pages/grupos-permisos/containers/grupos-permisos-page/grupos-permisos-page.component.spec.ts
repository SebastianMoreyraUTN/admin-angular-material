import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPermisosPageComponent } from './grupos-permisos-page.component';

describe('GruposPermisosPageComponent', () => {
  let component: GruposPermisosPageComponent;
  let fixture: ComponentFixture<GruposPermisosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposPermisosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPermisosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
