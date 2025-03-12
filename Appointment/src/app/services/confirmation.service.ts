import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  private baseUrl = 'http://localhost:8082/appointments';

  constructor(private http: HttpClient) {}

  getAppointmentConfirmation(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirmation/${userId}`);
  }
}
