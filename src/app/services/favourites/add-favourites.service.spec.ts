import { TestBed } from '@angular/core/testing';

import { AddFavouritesService } from './add-favourites.service';

describe('AddFavouritesService', () => {
  let service: AddFavouritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
