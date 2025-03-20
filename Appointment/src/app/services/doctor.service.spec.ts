import { TestBed } from '@angular/core/testing';

import { DoctorService } from './doctor.service';
import { provideHttpClient } from '@angular/common/http';

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
              DoctorService,
              provideHttpClient()  // ✅ Fix: Add HttpClient Provider
            ]
    });
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
