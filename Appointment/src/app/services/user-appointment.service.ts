import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAppointmentService {

  private baseUrl = 'http://localhost:8082/appointments';

  constructor(private http: HttpClient) {}

  getUserAppointments(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  submitReview(review: any): Observable<any> {
    return this.http.post('http://localhost:8082/reviews/submit', review);
  }
}
