import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '../../../services/confirmation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit{
  appointmentDetails: any;
  userId: number = Number(localStorage.getItem('userNumber'));
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    // Fetch appointment details
    this.getAppointmentDetails();
  }

  getAppointmentDetails(): void {
    this.confirmationService.getAppointmentConfirmation(this.userId).subscribe(
      (data) => {
        //console.log(data);
        this.appointmentDetails = data;
      },
      (error) => {
        console.error('Error fetching appointment details:', error);
      }
    );
  }

  goToHome() {
    this.router.navigate(['/departments']);
  }
}
