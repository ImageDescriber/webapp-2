import { TestBed, inject } from '@angular/core/testing';

import { DepictService } from './depict.service';

describe('DepictService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepictService]
    });
  });

  it('should be created', inject([DepictService], (service: DepictService) => {
    expect(service).toBeTruthy();
  }));
});
