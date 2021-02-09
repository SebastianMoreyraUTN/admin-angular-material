import { TestBed } from '@angular/core/testing';

import { TablerosService } from './tableros.service';

describe('TablerosService', () => {
  let service: TablerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
