import { Component, OnInit } from '@angular/core';
  // Adjust the import path
AppointmentManageDTO // Adjust the import path
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
      next:(data) => {
        this.appointments = data;
      },
      error:(error) => {
        console.error('Error fetching appointments:', error);
      }}
    );
  }
}
