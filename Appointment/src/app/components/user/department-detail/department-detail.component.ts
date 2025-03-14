import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../services/department.service';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from '../doctors/doctors.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  today: string = ''; // ✅ Define today

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0]; // ✅ Ensure today is set
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDoctorsByDepartment(this.departmentId);
  }

  // ✅ Fetch doctors for the department
  getDoctorsByDepartment(id: number) {
    this.departmentService.getDoctorByDepartment(id).subscribe({
      next: (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.doctors = response.map(doctor => ({
            ...doctor,
            selectedDate: this.today, // ✅ Default to today
            selectedTime: '',
            bookedSlotsByDate: {}, // ✅ Store booked slots by date
            availableTimes: [...this.availableTimes] // ✅ Assign times to each doctor
          }));
  
          // ✅ Fetch booked slots for today's date
          this.doctors.forEach(doctor => {
            this.getBookedSlotsForDoctor(doctor.id, doctor.selectedDate);
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

  // ✅ Ensure this function exists
  onDateChange(doctor: any) {
    doctor.selectedTime = ''; // ✅ Reset time selection

    // ✅ Ensure selectedDate is properly formatted
    const selectedDate = new Date(doctor.selectedDate);
    doctor.selectedDate = selectedDate.toISOString().split('T')[0]; // ✅ Convert to YYYY-MM-DD format

    console.log(`Doctor ${doctor.name} selected date: ${doctor.selectedDate}`); // ✅ Debugging

    this.getBookedSlotsForDoctor(doctor.id, doctor.selectedDate);
  }

  // ✅ Fetch booked slots for a doctor on a specific date
  getBookedSlotsForDoctor(doctorId: number, date: string) {
    this.http.get<string[]>(`http://localhost:8082/appointments/booked-slots/${doctorId}/${date}`).subscribe({
      next: (bookedSlots) => {
        const doctor = this.doctors.find(d => d.id === doctorId);
        if (doctor) {
          doctor.bookedSlotsByDate[date] = bookedSlots; // ✅ Store slots for selected date
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error("Error fetching booked slots:", error);
      }
    });
  }

  // ✅ Book an appointment
  bookAppointment(doctor: any) {
    if (!doctor.selectedTime) {
      alert(`Please select an appointment time for ${doctor.name}`);
      return;
    }

    const appointmentData = {
      doctorId: doctor.id,
      userId: 1, // Replace with actual logged-in user ID
      slot: doctor.selectedTime,
      date: doctor.selectedDate
    };

    console.log("Sending appointment request:", appointmentData); // ✅ Debugging

    this.http.post('http://localhost:8082/appointments/book', appointmentData).subscribe({
      next: () => {
        alert(`Appointment booked for ${doctor.name} on ${doctor.selectedDate} at ${doctor.selectedTime}`);
        doctor.bookedSlotsByDate[doctor.selectedDate].push(doctor.selectedTime);
        doctor.selectedTime = ''; // ✅ Reset dropdown selection
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment. Please try again.');
      }
    });
  }
}
