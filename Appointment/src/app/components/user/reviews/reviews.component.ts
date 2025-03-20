import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from '../../../services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ReviewsComponent implements OnInit {
  reviewForm: FormGroup;
  appointment: any;
  //userId= 1;
  //userId = localStorage.getItem('userNumber')
  userId: number = Number(localStorage.getItem('userNumber')) ;


  constructor(private reviewService: ReviewService, private fb: FormBuilder, private router: Router) {
    this.reviewForm = this.fb.group({
      rating: [null, Validators.required],
      comments: ['']
    });
  }

  ngOnInit(): void {
    this.fetchLatestAppointment();
  }

  fetchLatestAppointment() {
    this.reviewService.getLatestAppointment(this.userId).subscribe({
      next: (data) => {
        //console.log('Fetched Appointment:', data); // Debugging
        this.appointment = data; // Ensure data is assigned properly
      },
      error: (err) => console.error('Error fetching appointment', err)
    });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const reviewData = {
        rating: this.reviewForm.value.rating,
        comments: this.reviewForm.value.comments,
        userId: this.userId, // Include userId
        doctorId:  this.appointment.doctorId
      };
  
      //console.log('Submitting review:', reviewData); // Debugging log
  
      this.reviewService.submitReview(reviewData).subscribe({
        next: (response) => {
          //console.log("review response",response);
          //alert('Review submitted successfully!');
          this.router.navigate(['/departments']); // Redirect after submission
        },
        error: (err) => console.error('Error submitting review', err)
      });
    }
  }
  

  skipReview() {
    this.router.navigate(['/departments']); // Navigate to dashboard or home page
  }
}
