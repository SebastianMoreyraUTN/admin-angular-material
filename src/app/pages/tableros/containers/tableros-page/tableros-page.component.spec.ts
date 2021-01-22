import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablerosPageComponent } from './tableros-page.component';

describe('TablerosPageComponent', () => {
  let component: TablerosPageComponent;
  let fixture: ComponentFixture<TablerosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablerosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablerosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
