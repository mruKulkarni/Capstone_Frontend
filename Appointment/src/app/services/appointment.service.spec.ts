import { TestBed } from '@angular/core/testing';

import { AppointmentService } from './appointment.service';
import { provideHttpClient } from '@angular/common/http';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppointmentService,
        provideHttpClient()  // ✅ Fix: Add HttpClient Provider
      ]
    });
    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
