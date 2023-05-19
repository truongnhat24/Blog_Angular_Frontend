import { TestBed } from '@angular/core/testing';

import { GetInfoJwtService } from './get-info-jwt.service';

describe('GetInfoJwtService', () => {
  let service: GetInfoJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInfoJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
