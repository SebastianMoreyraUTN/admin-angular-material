import { TestBed } from '@angular/core/testing';

import { GruposPermisosService } from './grupos-permisos.service';

describe('GruposPermisosService', () => {
  let service: GruposPermisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposPermisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
