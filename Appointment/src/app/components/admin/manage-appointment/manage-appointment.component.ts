import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { AppointmentManageDTO } from '../../../entity/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrls: ['./manage-appointment.component.css'],
  imports:[CommonModule]
})
export class ManageAppointmentComponent implements OnInit {
  
  appointments: AppointmentManageDTO[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    // Fetch appointments when the component initializes
    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        //console.log('Appointments:', this.appointments); 
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });
  }

  // Mark appointment as Completed
  markCompleted(appointment: AppointmentManageDTO): void {
    // Ensure appointment has the 'appointmentId' property and call the service to update the status
    this.appointmentService.updateAppointmentStatus(appointment.appointmentId, 'Completed').subscribe({
      next: (updatedAppointment) => {
        // Update the status locally after the backend update
        const index = this.appointments.findIndex(app => app.appointmentId === appointment.appointmentId);  // Use appointmentId here
        if (index !== -1) {
          this.appointments[index].status = 'Completed';
        }
      },
      error: (error) => {
        console.error('Error updating appointment status:', error);
      }
    });
  }
  
  
}
