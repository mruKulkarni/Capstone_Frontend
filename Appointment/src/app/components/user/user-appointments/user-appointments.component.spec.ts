import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppointmentsComponent } from './user-appointments.component';
import { provideHttpClient } from '@angular/common/http';

describe('UserAppointmentsComponent', () => {
  let component: UserAppointmentsComponent;
  let fixture: ComponentFixture<UserAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAppointmentsComponent],
      providers: [
                    provideHttpClient()
                  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
