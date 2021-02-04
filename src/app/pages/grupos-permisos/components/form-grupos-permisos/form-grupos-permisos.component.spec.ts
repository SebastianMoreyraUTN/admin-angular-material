import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGruposPermisosComponent } from './form-grupos-permisos.component';

describe('FormGruposPermisosComponent', () => {
  let component: FormGruposPermisosComponent;
  let fixture: ComponentFixture<FormGruposPermisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGruposPermisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGruposPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
