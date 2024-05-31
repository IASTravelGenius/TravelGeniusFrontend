import { TestBed } from '@angular/core/testing';

import { LastAccessedService } from './last-accessed.service';

describe('LastAccessedService', () => {
  let service: LastAccessedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastAccessedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
