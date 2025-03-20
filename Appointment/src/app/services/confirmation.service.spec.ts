import { TestBed } from '@angular/core/testing';

import { ConfirmationService } from './confirmation.service';
import { provideHttpClient } from '@angular/common/http';

describe('ConfirmationService', () => {
  let service: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfirmationService,
        provideHttpClient()  // ✅ Fix: Add HttpClient Provider
      ]
    });
    service = TestBed.inject(ConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
