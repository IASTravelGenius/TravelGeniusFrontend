import { TestBed } from '@angular/core/testing';

import { TouristicAttractionService } from './touristic-attraction.service';

describe('TouristicAttractionService', () => {
  let service: TouristicAttractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristicAttractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
