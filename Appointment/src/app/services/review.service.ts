import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AppointmentDetails {
  doctorName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
}

interface ReviewPayload {
  rating: number;
  comments?: string;
  userId: number;
  doctorId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8082/reviews';

  constructor(private http: HttpClient) {}

  getLatestAppointment(userId: number): Observable<AppointmentDetails> {
    //console.log(this.http.get<AppointmentDetails>(`${this.apiUrl}/latest-appointment/${userId}`));
    return this.http.get<AppointmentDetails>(`${this.apiUrl}/latest-appointment/${userId}`);
  }

  submitReview(review: ReviewPayload): Observable<any> {
    //console.log(review);
    return this.http.post(`${this.apiUrl}/submit`, review);
  }
}
