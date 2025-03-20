import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentManageDTO } from '../entity/appointment.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8082/appointments'; // Base URL for your API
  // private apiUrl1 = 'http://localhost:8082/appointments';

  constructor(private http: HttpClient) { }

  // Fetch all appointments
  getAllAppointments(): Observable<AppointmentManageDTO[]> {
    return this.http.get<AppointmentManageDTO[]>(`${this.apiUrl}/all`);
  }

  // Update the status of an appointment
  updateAppointmentStatus(appointmentId: number, status: string): Observable<AppointmentManageDTO> {
    // Replace with actual API endpoint for updating status
    //console.log(appointmentId);
    return this.http.put<AppointmentManageDTO>(`${this.apiUrl}/${appointmentId}/status`, { status });
  }
}
