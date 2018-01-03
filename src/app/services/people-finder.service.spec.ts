import { TestBed, inject } from '@angular/core/testing';

import { PeopleFinderService } from './people-finder.service';

describe('PeopleFinderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleFinderService]
    });
  });

  it('should be created', inject([PeopleFinderService], (service: PeopleFinderService) => {
    expect(service).toBeTruthy();
  }));
});
