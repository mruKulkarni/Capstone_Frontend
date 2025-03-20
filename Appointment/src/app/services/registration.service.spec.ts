import { TestBed } from '@angular/core/testing';

import { RegisterService } from './registration.service';
import { provideHttpClient } from '@angular/common/http';

describe('RegistrationService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
                    RegisterService,
                    provideHttpClient()  // ✅ Fix: Add HttpClient Provider
                  ]
    });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
