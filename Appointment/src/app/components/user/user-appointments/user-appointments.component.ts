import { Component, OnInit } from '@angular/core';
import { UserAppointmentService } from '../../../services/user-appointment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-appointments',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-appointments.component.html',
  styleUrl: './user-appointments.component.css'
})
export class UserAppointmentsComponent {
  appointments: any[] = [];
  selectedAppointment: any = null;
  reviewData = { rating: null, comment: '' };
  userId: number = Number(localStorage.getItem('userNumber'));

  constructor(private userAppointmentsService: UserAppointmentService) {}

  ngOnInit() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.userAppointmentsService.getUserAppointments(this.userId).subscribe((data) => {
      this.appointments = data;
      //console.log('Appointments:', this.appointments); // Debugging log
    });
  }

  openReviewForm(appointment: any) {
    if (appointment.status === 'Completed' && !appointment.reviewSubmitted) {
      this.selectedAppointment = appointment;
      this.reviewData = { rating: null, comment: '' }; // Reset form
      setTimeout(() => {
        const reviewForm = document.querySelector('.review-form');
        if (reviewForm) {
          reviewForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  cancelReview() {
    this.selectedAppointment = null;
  }

  submitReview() {
    if (!this.reviewData.rating) {
      alert('Please select a rating');
      return;
    }
  
    const reviewPayload = {
      doctorId: this.selectedAppointment.doctorId,
      userId: this.userId,
      appointmentId: this.selectedAppointment.appointmentId,
      rating: this.reviewData.rating,
      comments: this.reviewData.comment
    };
  
    // ✅ Log the payload before sending
    //console.log('Submitting Review:', reviewPayload);
  
    this.userAppointmentsService.submitReview(reviewPayload).subscribe(response => {
      //console.log('Review Submission Successful:', response);
      //alert('Review submitted successfully!');
  
      this.selectedAppointment.reviewSubmitted = true; // Mark as submitted
      this.selectedAppointment.rating = this.reviewData.rating; // ✅ Store submitted rating
      this.selectedAppointment.comment = this.reviewData.comment; // ✅ Store submitted comment
      this.selectedAppointment = null; // Close the form
    }, error => {
      console.error('Review Submission Failed:', error);
      alert('Failed to submit review.');
    });
  }
  
  
  
}
