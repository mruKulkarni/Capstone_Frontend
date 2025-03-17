import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentManageDTO } from '../entity/appointment.service';
AppointmentManageDTO // Import your DTO model

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8082/appointments/all'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Fetch all appointments
  getAllAppointments(): Observable<AppointmentManageDTO[]> {
    return this.http.get<AppointmentManageDTO[]>(this.apiUrl);
  }
}
