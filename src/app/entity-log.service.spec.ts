import { TestBed, inject } from '@angular/core/testing';

import { EntityLogService } from './entity-log.service';

describe('EntityLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityLogService]
    });
  });

  it('should be created', inject([EntityLogService], (service: EntityLogService) => {
    expect(service).toBeTruthy();
  }));
});
