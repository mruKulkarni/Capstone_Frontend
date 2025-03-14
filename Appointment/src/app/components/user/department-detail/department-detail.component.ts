import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DepartmentService } from '../../../services/department.service';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from '../doctors/doctors.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DepartmentDetailComponent implements OnInit {
  departmentId!: number;
  doctors: any[] = [];
  availableTimes = ['9AM', '11AM', '1PM', '3PM', '5PM'];
  today: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDoctorsByDepartment(this.departmentId);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log("User returned to department page. Refetching booked slots...");
      this.getDoctorsByDepartment(this.departmentId);
    });
  }

  getDoctorsByDepartment(id: number) {
    this.departmentService.getDoctorByDepartment(id).subscribe({
      next: (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.doctors = response.map(doctor => ({
            ...doctor,
            selectedDate: '',
            selectedTime: '',
            bookedSlotsByDate: {},
            availableTimes: [...this.availableTimes]
          }));

          this.doctors.forEach(doctor => {
            this.getBookedSlotsForDoctor(doctor.id, this.today);
          });
        } else {
          this.doctors = [];
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error fetching doctors:", error);
      }
    });
  }

  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // ✅ Move to next day
    return tomorrow.toISOString().split('T')[0];
  }

  onDateChange(doctor: any) {
    doctor.selectedTime = ''; // Reset selected time
    doctor.availableTimes = [...this.availableTimes];
  
    const selectedDate = new Date(doctor.selectedDate);
    doctor.selectedDate = selectedDate.toISOString().split('T')[0];
  
    // ✅ Block booking for today
    if (doctor.selectedDate === this.today) {
      alert("Booking for today is not allowed. Please select another date.");
      doctor.selectedDate = ''; // Reset date selection
      return;
    }
  
    this.getBookedSlotsForDoctor(doctor.id, doctor.selectedDate);
  }
  

  
  getBookedSlotsForDoctor(doctorId: number, date: string) {
    this.http.get<string[]>(`http://localhost:8082/appointments/booked-slots/${doctorId}/${date}`).subscribe({
      next: (bookedSlots) => {
        const doctor = this.doctors.find(d => d.id === doctorId);
        if (doctor) {
          doctor.bookedSlotsByDate[date] = bookedSlots;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error("Error fetching booked slots:", error);
      }
    });
  }

  bookAppointment(doctor: any) {
    const email = localStorage.getItem('userId');
    if (!email || email === "null") { 
      alert('You must be logged in to book an appointment.');
      return;
    }

    if (!doctor.selectedTime) {
      alert(`Please select an appointment time for ${doctor.name}`);
      return;
    }

    const appointmentData = {
      email: email.trim(),
      doctorId: doctor.id,
      date: doctor.selectedDate,
      slot: doctor.selectedTime
    };

    console.log("Booking appointment with:", appointmentData);

    this.http.post('http://localhost:8082/appointments/book', appointmentData).subscribe({
      next: () => {
        alert(`Appointment booked for ${doctor.name} on ${doctor.selectedDate} at ${doctor.selectedTime}`);
        this.router.navigate(['/appointment-confirmation']);

        if (!doctor.bookedSlotsByDate[doctor.selectedDate]) {
          doctor.bookedSlotsByDate[doctor.selectedDate] = [];
        }
        doctor.bookedSlotsByDate[doctor.selectedDate].push(doctor.selectedTime);

        doctor.selectedTime = '';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error booking appointment:', error);
        alert(error.error?.error || 'Failed to book appointment. Please try again.');
      }
    });
  }  
}
