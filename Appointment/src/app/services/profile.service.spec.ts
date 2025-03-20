import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
              ProfileService,
              provideHttpClient()  // ✅ Fix: Add HttpClient Provider
            ]
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
