/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BubleSortService } from './buble-sort.service';

describe('Service: BubleSort', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BubleSortService]
    });
  });

  it('should ...', inject([BubleSortService], (service: BubleSortService) => {
    expect(service).toBeTruthy();
  }));
});
