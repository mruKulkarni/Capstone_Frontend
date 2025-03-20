import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DepartmentService } from '../../../services/department.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DepartmentDetailComponent implements OnInit {
  isAdmin: boolean = false;
  deactivateDocError : boolean = false;
  bookingFailError: boolean = false;

  departmentId!: number;
  departmentName: string = ''; // ✅ Store department name
  doctors: any[] = [];
  availableTimes = ['9 AM', '11 AM', '1 PM', '3 PM', '5 PM'];
  today: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true'; 
    this.today = new Date().toISOString().split('T')[0];
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDepartmentName(this.departmentId);
    this.getDoctorsByDepartment(this.departmentId);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      //console.log("User returned to department page. Refetching booked slots...");
      this.getDoctorsByDepartment(this.departmentId);
    });
  }


  // deleteDoctor(id: number) {
  //   if (confirm('Are you sure you want to delete this doctor?')) {
  //     this.http.delete(`http://localhost:8082/doctors/${id}`).subscribe(() => {
  //       alert('Doctor deleted successfully');
  //       this.getDoctorsByDepartment(this.departmentId); // ✅ Refresh doctor list after deletion
  //     }, error => {
  //       alert('Failed to delete doctor');
  //     });
  //   }
  // }

  deleteDoctor(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.http.put(`http://localhost:8082/doctors/${id}/deactivate`, {}, { responseType: 'text' }).subscribe({
        next: () => {
          //alert('Doctor deactivated successfully');
          this.getDoctorsByDepartment(this.departmentId); // ✅ Refresh doctor list after soft delete
        },
        error: (error) => {
          this.deactivateDocError = true;
          //console.error('Error deactivating doctor:', error);
         // alert('Failed to deactivate doctor. Please try again.');
        }
      });
    }
  }
  

  getDepartmentName(id: number) {
    this.http.get<any>(`http://localhost:8082/departments/${id}`).subscribe({
      next: (response) => {
        this.departmentName = response.name; // ✅ Assuming API returns { "id": 1, "name": "Cardiology" }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error fetching department name:", error);
      }
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
            availableTimes: [],
            timeSlotsFetched: false,
            doctorCode: doctor.doctorCode,
            showReviews: false, // Controls dropdown visibility
            reviews: [] // Stores fetched reviews
          }));
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
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1); // ✅ Allow up to 1 month from today
    return maxDate.toISOString().split('T')[0];
  }

  onDateChange(doctor: any) {
    doctor.selectedTime = ''; // Reset selected time
    doctor.availableTimes = []; // Reset available times
    doctor.timeSlotsFetched = false; // Prevent time slot selection before fetching
    
    const selectedDate = new Date(doctor.selectedDate);
    doctor.selectedDate = selectedDate.toISOString().split('T')[0];

    if (doctor.selectedDate === this.today) {
      //alert("Booking for today is not allowed. Please select another date.");
      doctor.selectedDate = ''; // Reset date selection
      return;
    }
  }

  fetchTimeSlots(doctor: any) {
    if (!doctor.selectedDate) {
      //alert("Please select a date before fetching available time slots.");
      return;
    }

    this.http.get<string[]>(`http://localhost:8082/appointments/booked-slots/${doctor.id}/${doctor.selectedDate}`).subscribe({
      next: (bookedSlots) => {
        doctor.bookedSlotsByDate[doctor.selectedDate] = bookedSlots;
        doctor.availableTimes = this.availableTimes.filter(time => !bookedSlots.includes(time));
        doctor.timeSlotsFetched = true; // Allow time selection
        this.cdr.detectChanges();
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

    //console.log("Booking appointment with:", appointmentData);

    this.http.post('http://localhost:8082/appointments/book', appointmentData).subscribe({
      next: () => {
        //alert(`Appointment booked for ${doctor.name} on ${doctor.selectedDate} at ${doctor.selectedTime}`);
        this.router.navigate(['/appointment-confirmation']);

        if (!doctor.bookedSlotsByDate[doctor.selectedDate]) {
          doctor.bookedSlotsByDate[doctor.selectedDate] = [];
        }
        doctor.bookedSlotsByDate[doctor.selectedDate].push(doctor.selectedTime);

        doctor.selectedTime = '';
        this.cdr.detectChanges();
      },
      error: (error) => {
        //console.error('Error booking appointment:', error);
        //alert(error.error?.error || 'Failed to book appointment. Please try again.');
        this.bookingFailError = true;
      }
    });
  }

  getDoctorReviews(doctorId: number) {
    this.http.get<any[]>(`http://localhost:8082/reviews/doctor/${doctorId}`).subscribe({
      next: (reviews) => {
        const doctor = this.doctors.find(d => d.id === doctorId);
        if (doctor) {
          doctor.reviews = reviews.map(review => ({
            rating: review.rating,
            comment: review.comments,
            reviewer: review.userName // ✅ Fetch reviewer’s name
          }));
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error("Error fetching reviews:", error);
      }
    });
  }

  toggleReviews(doctor: any) {
    doctor.showReviews = !doctor.showReviews;
    if (doctor.showReviews && doctor.reviews.length === 0) {
      this.getDoctorReviews(doctor.id);
    }
  }

  editDoctor(doctor: any) {
    doctor.isEditing = true;
    doctor.editName = doctor.name;
    doctor.editQualification = doctor.qualification;
  }
  
  saveDoctor(doctor: any) {
    const updatedData = {
      name: doctor.editName,
      qualification: doctor.editQualification
    };
  
    this.doctorService.updateDoctor(doctor.id, updatedData).subscribe(() => {
      doctor.name = doctor.editName;
      doctor.qualification = doctor.editQualification;
      doctor.isEditing = false;
    });
  }
  
  cancelEdit(doctor: any) {
    doctor.isEditing = false;
  }
  
}
