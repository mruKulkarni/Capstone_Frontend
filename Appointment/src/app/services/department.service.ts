import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8082'; // ✅ Ensure correct API base URL

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departments`);
  }

  getDoctorByDepartment(id: number): Observable<any[]> { // ✅ Fix method name
    const endpoint = `${this.apiUrl}/departments/${id}/doctors`;
    console.log("Fetching doctors from:", endpoint); // ✅ Debugging log
    return this.http.get<any[]>(endpoint); // ✅ Directly return Observable
  }
}
