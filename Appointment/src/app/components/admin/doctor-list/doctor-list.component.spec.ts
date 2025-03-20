import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListComponent } from './doctor-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('DoctorListComponent', () => {
  let component: DoctorListComponent;
  let fixture: ComponentFixture<DoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorListComponent],
      providers: [
              provideHttpClient()
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
