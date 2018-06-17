import { TestBed, inject } from '@angular/core/testing';

import { WikidataService } from './wikidata.service';

describe('WikidataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikidataService]
    });
  });

  it('should be created', inject([WikidataService], (service: WikidataService) => {
    expect(service).toBeTruthy();
  }));
});
