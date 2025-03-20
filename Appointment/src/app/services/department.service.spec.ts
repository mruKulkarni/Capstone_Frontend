import { TestBed } from '@angular/core/testing';


import { DepartmentService } from './department.service';
import { provideHttpClient } from '@angular/common/http';

describe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
                    DepartmentService,
                    provideHttpClient()  // ✅ Fix: Add HttpClient Provider
                  ]
    });
    service = TestBed.inject(DepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
