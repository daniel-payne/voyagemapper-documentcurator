/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicationStoreService } from './application-store.service';

describe('Service: ApplicationStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationStoreService]
    });
  });

  it('should ...', inject([ApplicationStoreService], (service: ApplicationStoreService) => {
    expect(service).toBeTruthy();
  }));
});
