import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:8082/doctors'; // Update based on your backend URL

  constructor(private http: HttpClient) {}

  updateDoctor(id: number, updateData: { name: string; qualification: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateData);
  }
  
}
