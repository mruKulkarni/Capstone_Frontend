import { TestBed } from '@angular/core/testing';

import { UserAppointmentService } from './user-appointment.service';
import { provideHttpClient } from '@angular/common/http';

describe('UserAppointmentService', () => {
  let service: UserAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAppointmentService,
        provideHttpClient()  // ✅ Fix: Add HttpClient Provider
      ]
    });
    service = TestBed.inject(UserAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
