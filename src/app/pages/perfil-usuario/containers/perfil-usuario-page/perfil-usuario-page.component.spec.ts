import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioPageComponent } from './perfil-usuario-page.component';

describe('PerfilUsuarioPageComponent', () => {
  let component: PerfilUsuarioPageComponent;
  let fixture: ComponentFixture<PerfilUsuarioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
